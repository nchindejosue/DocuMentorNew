import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Share2, 
  Download, 
  Settings, 
  MessageSquare,
  CheckSquare,
  BarChart3,
  History,
  Users
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../store/projectStore';
import { projectService } from '../../services/projectService';
import { documentService } from '../../services/documentService';
import Navbar from '../../components/Layout/Navbar';
import ComplianceChecklist from '../../components/workspace/ComplianceChecklist';
import ChatMentor from '../../components/workspace/ChatMentor';
import DocumentViewer from '../../components/workspace/DocumentViewer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    currentProject, 
    currentDocument, 
    documents, 
    documentHealth,
    setCurrentProject,
    setCurrentDocument,
    setDocuments,
    setDocumentHealth,
    setLoading 
  } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'compliance' | 'chat' | 'style' | 'history' | 'collaboration'>('compliance');
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const project = await projectService.getProject(projectId!);
      const projectDocuments = await projectService.getDocuments(projectId!);
      
      setCurrentProject(project);
      setDocuments(projectDocuments);
      
      if (projectDocuments.length > 0) {
        setCurrentDocument(projectDocuments[0]);
        loadDocumentHealth(projectDocuments[0].id);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDocumentHealth = async (documentId: string) => {
    try {
      const health = await projectService.getDocumentHealth(documentId);
      setDocumentHealth(health);
    } catch (error) {
      console.error('Error loading document health:', error);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    if (!projectId) return;
    
    setIsUploading(true);
    const newDocuments = [...documents];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const allowedTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'text/plain'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['docx', 'pdf', 'txt'];
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
        console.error('Unsupported file type:', file.type, fileExtension);
        continue;
      }
      
      try {
        const uploadedDoc = await documentService.uploadDocument(projectId, file);
        newDocuments.push(uploadedDoc);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    
    setDocuments(newDocuments);
    setIsUploading(false);
    
    // Auto-select the first uploaded document
    if (newDocuments.length > documents.length) {
      const newDoc = newDocuments[newDocuments.length - 1];
      setCurrentDocument(newDoc);
      loadDocumentHealth(newDoc.id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const tabs = [
    { id: 'compliance', label: 'Compliance', icon: CheckSquare },
    { id: 'chat', label: 'AI Mentor', icon: MessageSquare },
    { id: 'style', label: 'Style Report', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
    { id: 'collaboration', label: 'Team', icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'compliance':
        return <ComplianceChecklist />;
      case 'chat':
        return <ChatMentor />;
      case 'style':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Analysis</h3>
            <p className="text-gray-600">Style analysis features coming soon...</p>
          </div>
        );
      case 'history':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Version History</h3>
            <p className="text-gray-600">Version history features coming soon...</p>
          </div>
        );
      case 'collaboration':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Collaboration</h3>
            <p className="text-gray-600">Collaboration features coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="h-[calc(100vh-64px)] flex">
        {/* Left Sidebar - Files */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Project Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {currentProject?.title || 'Project'}
            </h2>
            <p className="text-sm text-gray-600">
              {currentProject?.description}
            </p>
          </div>

          {/* Upload Area */}
          <div className="p-4 border-b border-gray-200">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 
                isUploading ? 'border-yellow-500 bg-yellow-50' :
                'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2"></div>
                  <p className="text-sm text-yellow-700 mb-2">Uploading documents...</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Supports: DOCX, PDF, TXT
                  </p>
                </>
              )}
              <input
                type="file"
                multiple
                accept=".docx,.pdf,.txt"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label htmlFor="file-upload" className={isUploading ? 'pointer-events-none' : ''}>
                <Button variant="outline" size="sm" disabled={isUploading}>
                  Choose Files
                </Button>
              </label>
            </div>
          </div>

          {/* Documents List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Documents</h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentDocument?.id === doc.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentDocument(doc);
                      loadDocumentHealth(doc.id);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.type.toUpperCase()} • {(doc.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Document Viewer */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentDocument?.title || 'No document selected'}
                </h1>
                {currentDocument && (
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentDocument.status === 'ready' ? 'bg-green-100 text-green-800' :
                      currentDocument.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentDocument.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentDocument.role === 'document' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {currentDocument.role}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Document Viewer */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
            <DocumentViewer 
              document={currentDocument}
              onElementClick={(elementId) => {
                // Handle element click for compliance highlighting
                console.log('Element clicked:', elementId);
              }}
            />
          </div>
        </div>

        {/* Right Sidebar - Interactive Mentor */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-3 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mx-auto mb-1" />
                  <span className="block">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';
import { Document } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface DocumentViewerProps {
  document: Document | null;
  onElementClick?: (elementId: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onElementClick }) => {
  const [content, setContent] = useState<string>('');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (document) {
      loadDocument();
    } else {
      setContent('');
      setError('');
    }
  }, [document]);

  const loadDocument = async () => {
    if (!document) return;

    setIsLoading(true);
    setError('');

    try {
      if (document.processedContent) {
        // Use already processed content
        setContent(document.processedContent);
      } else if (document.content) {
        // Process the actual uploaded file
        const processedContent = await documentService.getDocumentContent(document);
        setContent(processedContent);
      } else {
        // Fallback to mock content for demo
        const mockContent = await getMockDocumentContent(document);
        
        if (document.type === 'docx') {
          await renderDocxContent(mockContent);
        } else if (document.type === 'txt') {
          setContent(mockContent);
        }
      }
      // PDF rendering is handled by react-pdf component
    } catch (err) {
      setError('Failed to load document');
      console.error('Document loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getMockDocumentContent = async (doc: Document): Promise<string> => {
    // In a real implementation, this would fetch the actual file content
    const mockContents = {
      'sample-thesis.docx': `
        <h1>Research Thesis: AI in Document Processing</h1>
        <h2>Abstract</h2>
        <p>This thesis explores the application of artificial intelligence in document processing systems. The research demonstrates how machine learning algorithms can significantly improve document formatting, compliance checking, and content analysis.</p>
        
        <h2>1. Introduction</h2>
        <p>Document processing has evolved significantly with the advent of artificial intelligence. Traditional methods of document formatting and compliance checking were manual and time-consuming processes that often resulted in inconsistencies and errors.</p>
        
        <h3>1.1 Problem Statement</h3>
        <p>The primary challenge in document processing lies in maintaining consistency across different document types while ensuring compliance with various formatting standards such as APA, MLA, and Chicago styles.</p>
        
        <h2>2. Literature Review</h2>
        <p>Recent studies have shown that AI-powered document processing can reduce formatting errors by up to 95% while improving processing speed by 300%. Key findings include:</p>
        <ul>
          <li>Automated style guide application</li>
          <li>Real-time compliance checking</li>
          <li>Intelligent content suggestions</li>
        </ul>
        
        <h2>3. Methodology</h2>
        <p>This research employed a mixed-methods approach, combining quantitative analysis of processing efficiency with qualitative assessment of user satisfaction.</p>
        
        <blockquote>"The integration of AI in document processing represents a paradigm shift in how we approach academic and professional writing." - Dr. Smith, 2024</blockquote>
        
        <h2>4. Results</h2>
        <p>The implementation of AI-powered document processing showed remarkable improvements in both efficiency and accuracy metrics.</p>
        
        <h2>5. Conclusion</h2>
        <p>This research demonstrates the significant potential of AI in revolutionizing document processing workflows, providing both immediate practical benefits and long-term strategic advantages.</p>
      `,
      'business-report.pdf': 'PDF_CONTENT', // This will be handled by react-pdf
      'meeting-notes.txt': `Meeting Notes - Project Planning Session
Date: January 15, 2024
Attendees: Sarah Chen, Dr. Rodriguez, Mike Johnson

Agenda:
1. Project timeline review
2. Resource allocation
3. Quality assurance protocols
4. Next steps

Discussion Points:

Timeline Review:
- Phase 1: Research and analysis (2 weeks)
- Phase 2: Development and testing (4 weeks)
- Phase 3: Implementation and deployment (2 weeks)
- Total project duration: 8 weeks

Resource Allocation:
- Development team: 3 developers
- QA team: 2 testers
- Project management: 1 PM
- Budget: $50,000

Quality Assurance:
- Daily code reviews
- Weekly progress meetings
- Automated testing pipeline
- User acceptance testing

Action Items:
1. Sarah to finalize technical specifications by Jan 20
2. Dr. Rodriguez to review compliance requirements by Jan 18
3. Mike to prepare resource allocation plan by Jan 22

Next Meeting: January 22, 2024 at 2:00 PM`
    };

    return mockContents[doc.title as keyof typeof mockContents] || 'Sample document content...';
  };

  const renderDocxContent = async (htmlContent: string) => {
    // In a real implementation, you would use mammoth.js to convert DOCX to HTML
    // For demo purposes, we'll use the mock HTML content
    setContent(htmlContent);
  };

  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const elementId = target.getAttribute('data-doc-element-id');
    if (elementId && onElementClick) {
      onElementClick(elementId);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(prevPageNumber + offset, 1), numPages));
  };

  const changeScale = (newScale: number) => {
    setScale(Math.min(Math.max(newScale, 0.5), 3.0));
  };

  const rotateDocument = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Document Selected
          </h3>
          <p className="text-gray-600">
            Upload a document or select one from the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Document</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadDocument}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Document Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">{document.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            document.status === 'ready' ? 'bg-green-100 text-green-800' :
            document.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {document.status}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {document.type === 'pdf' && (
            <>
              <Button variant="outline" size="sm" onClick={() => changeScale(scale - 0.1)}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="sm" onClick={() => changeScale(scale + 0.1)}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={rotateDocument}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="p-8">
              {document.type === 'docx' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-em:italic prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic"
                  onClick={handleElementClick}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
              
              {document.type === 'txt' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap font-mono text-sm text-gray-800"
                >
                  {content}
                </motion.div>
              )}
              
              {document.type === 'pdf' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  {document.content ? (
                    <PDFDocument
                      file={document.content}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      }
                      error={
                        <div className="text-center py-8">
                          <p className="text-red-600">Failed to load PDF</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Please try uploading the PDF file again
                          </p>
                        </div>
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        rotate={rotation}
                        className="shadow-lg"
                      />
                    </PDFDocument>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">PDF file not available</p>
                    </div>
                  )}
                  
                  {numPages > 1 && (
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {pageNumber} of {numPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= numPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ToolsPage: React.FC = () => {
  const { tool } = useParams<{ tool: string }>();
  const navigate = useNavigate();

  const tools = {
    citations: {
      title: 'Citation Helper',
      description: 'Generate perfect citations in APA, MLA, and Chicago styles',
      icon: FileText,
      color: 'from-green-500 to-green-600',
    },
    'brand-compliance': {
      title: 'Brand Compliance',
      description: 'Ensure your documents meet brand standards',
      icon: CheckCircle,
      color: 'from-teal-500 to-teal-600',
    },
    'style-analysis': {
      title: 'Style Analysis',
      description: 'Analyze and improve your writing style',
      icon: Zap,
      color: 'from-cyan-500 to-cyan-600',
    },
  };

  const currentTool = tools[tool as keyof typeof tools];

  if (!currentTool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
            <p className="text-gray-600 mb-4">The requested tool could not be found.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentTool.color} rounded-xl flex items-center justify-center`}>
              <currentTool.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentTool.title}</h1>
              <p className="text-gray-600">{currentTool.description}</p>
            </div>
          </div>
        </motion.div>

        <Card>
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentTool.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <currentTool.icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentTool.title} Coming Soon
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working hard to bring you this powerful tool. 
                It will be available in a future update.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
              <p className="text-sm text-gray-500">
                Want to be notified when this tool is ready? 
                <button className="text-blue-600 hover:text-blue-700 ml-1">
                  Join our waitlist
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ToolsPage;
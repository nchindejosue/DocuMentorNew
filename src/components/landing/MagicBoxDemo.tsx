import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface ComplianceItem {
  id: string;
  title: string;
  status: 'pass' | 'fail';
  fixed?: boolean;
}

const MagicBoxDemo: React.FC = () => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    { id: '1', title: 'Proper heading hierarchy', status: 'fail' },
    { id: '2', title: 'Consistent font usage', status: 'fail' },
    { id: '3', title: 'Correct citation format', status: 'fail' },
    { id: '4', title: 'Document structure', status: 'fail' },
    { id: '5', title: 'Margin compliance', status: 'pass' },
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateProcessing();
  }, []);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFixDocument = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setComplianceItems(prev => prev.map(item => ({ ...item, status: 'pass', fixed: true })));
      setIsFixed(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateProcessing();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See the Magic in Action
          </h2>
          <p className="text-xl text-gray-600">
            Drop any document and watch DocuMentor transform it instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {!showResults ? (
            <div className="text-center">
              <motion.div
                className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
                  isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
              >
                <AnimatePresence>
                  {isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Analyzing your document...
                      </p>
                      <p className="text-gray-600">
                        AI is checking compliance and formatting
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drop your document here
                      </p>
                      <p className="text-gray-600 mb-4">
                        Or click to browse files
                      </p>
                      <input
                        type="file"
                        accept=".docx,.pdf,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Document Preview */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Document Analysis Complete
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Compliance Checklist
                    </h4>
                    <div className="space-y-2">
                      {complianceItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.random() * 0.3 }}
                          className="flex items-center space-x-3"
                        >
                          {item.status === 'pass' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className={`text-sm ${item.fixed ? 'text-green-700' : 'text-gray-700'}`}>
                            {item.title}
                            {item.fixed && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Fixed!
                              </span>
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Document Health
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Overall Score</span>
                        <span className={`text-sm font-semibold ${isFixed ? 'text-green-600' : 'text-red-600'}`}>
                          {isFixed ? '95%' : '45%'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: '45%' }}
                          animate={{ width: isFixed ? '95%' : '45%' }}
                          transition={{ duration: 1 }}
                          className={`h-2 rounded-full ${isFixed ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                {!isFixed ? (
                  <Button 
                    onClick={handleFixDocument}
                    variant="warning"
                    size="lg"
                    isLoading={isProcessing}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze & Fix My Document
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="success"
                    size="lg"
                  >
                    Try Dashboard Demo
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MagicBoxDemo;
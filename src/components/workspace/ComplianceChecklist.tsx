import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Zap } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import Button from '../ui/Button';

const ComplianceChecklist: React.FC = () => {
  const { documentHealth } = useProjectStore();

  if (!documentHealth) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Select a document to view compliance</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const fixableIssues = (documentHealth.items || []).filter(item => item.fixable && item.status === 'fail');

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Document Health</h3>
          <span className={`text-2xl font-bold ${getScoreColor(documentHealth.overallScore)}`}>
            {documentHealth.overallScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${documentHealth.overallScore}%` }}
            transition={{ duration: 1 }}
            className={`h-2 rounded-full ${
              documentHealth.overallScore >= 90 ? 'bg-green-500' :
              documentHealth.overallScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Category Scores */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category Breakdown</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(documentHealth.categories ?? {}).map(([category, score]) => (
            <div key={category} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category}
                </span>
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fix All Button */}
      {fixableIssues.length > 0 && (
        <div className="mb-6">
          <Button 
            variant="warning" 
            className="w-full"
            onClick={() => {
              // Handle fix all issues
              console.log('Fixing all issues...');
            }}
          >
            <Zap className="mr-2 h-4 w-4" />
            Fix All Issues ({fixableIssues.length})
          </Button>
        </div>
      )}

      {/* Compliance Items */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Compliance Items</h4>
        {(documentHealth.items || []).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h5>
                  {item.fixable && item.status === 'fail' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Handle individual fix
                        console.log('Fixing item:', item.id);
                      }}
                    >
                      Fix
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist;
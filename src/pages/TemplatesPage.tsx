import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Star, Eye } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const TemplatesPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const templates = {
    academic: [
      { id: '1', name: 'APA Research Paper', description: 'Standard APA format for research papers', downloads: 1234, rating: 4.8 },
      { id: '2', name: 'MLA Essay Template', description: 'Perfect for literature and humanities essays', downloads: 987, rating: 4.9 },
      { id: '3', name: 'Thesis Template', description: 'Comprehensive thesis structure with chapters', downloads: 543, rating: 4.7 },
      { id: '4', name: 'Lab Report', description: 'Scientific lab report with proper formatting', downloads: 765, rating: 4.6 },
    ],
    research: [
      { id: '5', name: 'Journal Article', description: 'IEEE format for technical publications', downloads: 2341, rating: 4.9 },
      { id: '6', name: 'Conference Paper', description: 'ACM conference paper template', downloads: 1876, rating: 4.8 },
      { id: '7', name: 'Grant Proposal', description: 'NSF grant proposal structure', downloads: 432, rating: 4.5 },
      { id: '8', name: 'Literature Review', description: 'Systematic literature review format', downloads: 654, rating: 4.7 },
    ],
    business: [
      { id: '9', name: 'Business Report', description: 'Professional business report template', downloads: 3456, rating: 4.8 },
      { id: '10', name: 'Project Proposal', description: 'Comprehensive project proposal format', downloads: 2109, rating: 4.6 },
      { id: '11', name: 'Executive Summary', description: 'Concise executive summary template', downloads: 1987, rating: 4.9 },
      { id: '12', name: 'Marketing Plan', description: 'Strategic marketing plan structure', downloads: 876, rating: 4.7 },
    ],
    writing: [
      { id: '13', name: 'Novel Manuscript', description: 'Standard novel formatting for submissions', downloads: 1543, rating: 4.8 },
      { id: '14', name: 'Short Story', description: 'Professional short story format', downloads: 987, rating: 4.7 },
      { id: '15', name: 'Screenplay', description: 'Industry-standard screenplay template', downloads: 654, rating: 4.9 },
      { id: '16', name: 'Blog Post', description: 'SEO-optimized blog post structure', downloads: 2341, rating: 4.6 },
    ],
  };

  const categoryTemplates = templates[category as keyof typeof templates] || [];
  const categoryTitle = category?.charAt(0).toUpperCase() + category?.slice(1) + ' Templates';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryTitle}</h1>
          <p className="text-gray-600">Professional templates to get you started quickly</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{template.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {template.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/project/template-${template.id}`)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
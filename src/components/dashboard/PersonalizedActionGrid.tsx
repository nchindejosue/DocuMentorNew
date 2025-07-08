import React from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, FileText, Sparkles, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Card from '../ui/Card';

const PersonalizedActionGrid: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const getPersonalizedActions = () => {
    const baseActions = [
      {
        id: 'new-project',
        title: 'Start New Project',
        description: 'Create a new document project',
        icon: Plus,
        color: 'from-blue-500 to-blue-600',
        action: () => navigate('/project/new-project-demo'),
      },
      {
        id: 'guided-authoring',
        title: 'Guided Authoring',
        description: 'Get AI assistance while writing',
        icon: Sparkles,
        color: 'from-yellow-500 to-yellow-600',
        action: () => navigate('/project/guided-authoring-demo'),
      },
    ];

    const personaActions = {
      student: [
        {
          id: 'academic-templates',
          title: 'Academic Templates',
          description: 'Essay, thesis, and research paper templates',
          icon: BookOpen,
          color: 'from-purple-500 to-purple-600',
          action: () => navigate('/templates/academic'),
        },
        {
          id: 'citation-helper',
          title: 'Citation Helper',
          description: 'APA, MLA, and Chicago style guides',
          icon: FileText,
          color: 'from-green-500 to-green-600',
          action: () => navigate('/tools/citations'),
        },
      ],
      researcher: [
        {
          id: 'research-templates',
          title: 'Research Templates',
          description: 'Journal articles and conference papers',
          icon: BookOpen,
          color: 'from-indigo-500 to-indigo-600',
          action: () => navigate('/templates/research'),
        },
        {
          id: 'collaboration',
          title: 'Collaboration Hub',
          description: 'Work with your research team',
          icon: Users,
          color: 'from-pink-500 to-pink-600',
          action: () => navigate('/collaboration'),
        },
      ],
      business: [
        {
          id: 'business-templates',
          title: 'Business Templates',
          description: 'Reports, proposals, and presentations',
          icon: FileText,
          color: 'from-orange-500 to-orange-600',
          action: () => navigate('/templates/business'),
        },
        {
          id: 'brand-compliance',
          title: 'Brand Compliance',
          description: 'Ensure consistent brand standards',
          icon: Settings,
          color: 'from-teal-500 to-teal-600',
          action: () => navigate('/tools/brand-compliance'),
        },
      ],
      writer: [
        {
          id: 'writing-templates',
          title: 'Writing Templates',
          description: 'Books, articles, and creative writing',
          icon: BookOpen,
          color: 'from-red-500 to-red-600',
          action: () => navigate('/templates/writing'),
        },
        {
          id: 'style-analysis',
          title: 'Style Analysis',
          description: 'Improve your writing style',
          icon: Sparkles,
          color: 'from-cyan-500 to-cyan-600',
          action: () => navigate('/tools/style-analysis'),
        },
      ],
    };

    const actions = [...baseActions];
    if (user?.persona && personaActions[user.persona]) {
      actions.push(...personaActions[user.persona]);
    }

    return actions;
  };

  const actions = getPersonalizedActions();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover onClick={action.action}>
              <div className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedActionGrid;
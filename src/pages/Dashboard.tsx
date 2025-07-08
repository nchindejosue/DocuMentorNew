import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, Users, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Layout/Navbar';
import PersonalizedActionGrid from '../components/dashboard/PersonalizedActionGrid';
import RecentProjectsList from '../components/dashboard/RecentProjectsList';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Documents Processed',
      value: '247',
      change: '+12%',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Time Saved',
      value: '38h',
      change: '+23%',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Collaborators',
      value: '12',
      change: '+2',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const tips = [
    "Try using the AI mentor chat for quick formatting questions",
    "Upload your style guide once to maintain consistency across all documents",
    "Use the collaboration features to work with your team in real-time",
    "Check out the templates section for industry-standard document formats",
  ];

  const getPersonaGreeting = () => {
    const greetings = {
      student: "Ready to ace your next assignment?",
      researcher: "Let's publish some groundbreaking research!",
      business: "Time to create compelling business documents!",
      writer: "Your next masterpiece awaits!",
    };
    return greetings[user?.persona || 'student'];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            {getPersonaGreeting()}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Actions & Projects */}
          <div className="lg:col-span-2">
            <PersonalizedActionGrid />
            <RecentProjectsList />
          </div>

          {/* Right Column - Tips & Activity */}
          <div className="space-y-6">
            {/* Pro Tips */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  💡 Pro Tips
                </h3>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Usage Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 This Month
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credits Used</span>
                    <span className="text-sm font-medium text-gray-900">
                      {100 - (user?.credits || 0)} / 100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${100 - (user?.credits || 0)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Documents</span>
                    <span className="text-sm font-medium text-gray-900">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fixes Applied</span>
                    <span className="text-sm font-medium text-gray-900">156</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
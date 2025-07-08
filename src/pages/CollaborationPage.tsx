import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, MessageSquare, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CollaborationPage: React.FC = () => {
  const navigate = useNavigate();

  const collaborators = [
    { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Editor', avatar: '👩‍🎓', status: 'online' },
    { id: '2', name: 'Dr. Rodriguez', email: 'rodriguez@example.com', role: 'Reviewer', avatar: '👨‍🏫', status: 'offline' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Contributor', avatar: '👨‍💼', status: 'online' },
  ];

  const recentActivity = [
    { id: '1', user: 'Sarah Chen', action: 'commented on', target: 'Introduction section', time: '2 minutes ago' },
    { id: '2', user: 'Dr. Rodriguez', action: 'approved', target: 'Literature Review', time: '1 hour ago' },
    { id: '3', user: 'Mike Johnson', action: 'edited', target: 'Methodology', time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Collaboration</h1>
              <p className="text-gray-600">Work together on documents in real-time</p>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Collaborator
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Members</h2>
                <div className="space-y-4">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{collaborator.avatar}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{collaborator.name}</h3>
                          <p className="text-sm text-gray-600">{collaborator.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          collaborator.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                          collaborator.role === 'Reviewer' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {collaborator.role}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Permissions
                  </Button>
                </div>
              </div>
            </Card>

            {/* Collaboration Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Members</span>
                    <span className="text-sm font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Comments</span>
                    <span className="text-sm font-medium text-gray-900">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revisions</span>
                    <span className="text-sm font-medium text-gray-900">12</span>
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

export default CollaborationPage;
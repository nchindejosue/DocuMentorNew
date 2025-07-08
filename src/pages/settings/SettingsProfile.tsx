import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Camera, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/Layout/Navbar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SettingsProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    persona: user?.persona || 'student',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser(formData);
      setIsLoading(false);
    }, 1000);
  };

  const personas = [
    { value: 'student', label: 'Student', description: 'Academic writing and research' },
    { value: 'researcher', label: 'Researcher', description: 'Scientific papers and publications' },
    { value: 'business', label: 'Business', description: 'Reports and presentations' },
    { value: 'writer', label: 'Writer', description: 'Creative and professional writing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{user?.name}</h3>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <Button variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
              </div>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Persona
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {personas.map((persona) => (
                        <label
                          key={persona.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.persona === persona.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="persona"
                            value={persona.value}
                            checked={formData.persona === persona.value}
                            onChange={(e) => setFormData({ ...formData, persona: e.target.value as any })}
                            className="sr-only"
                          />
                          <div className="text-sm font-medium text-gray-900">{persona.label}</div>
                          <div className="text-xs text-gray-600">{persona.description}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" isLoading={isLoading}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
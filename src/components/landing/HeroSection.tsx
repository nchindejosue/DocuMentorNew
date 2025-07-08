import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Smartphone, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const platformVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const platforms = [
    { name: 'Web', icon: Monitor, description: 'Access anywhere, anytime', action: () => navigate('/web-platform') },
    { name: 'Desktop', icon: Download, description: 'Full offline capabilities', action: () => window.open('#desktop', '_blank') },
    { name: 'Mobile', icon: Smartphone, description: 'On-the-go editing', action: () => window.open('#mobile', '_blank') },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Main Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl mb-6">
              <span className="text-white font-bold text-3xl">DM</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Docu<span className="text-blue-600">Mentor</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your AI-powered document companion. Perfect compliance, effortless formatting, 
              and intelligent guidance across all your platforms.
            </p>
          </motion.div>

          {/* Platform Selector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Choose Your Platform
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  custom={index}
                  variants={platformVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={platform.action}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                      <platform.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{platform.description}</p>
                    <Button variant="outline" size="sm">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full mb-6">
              <span className="text-yellow-800 font-medium">✨ New</span>
              <span className="text-yellow-700">AI-Powered Document Analysis</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of document formatting with our intelligent AI mentor 
              that understands your content and provides real-time guidance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
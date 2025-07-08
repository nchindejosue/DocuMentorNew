import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagicBoxDemo from '../components/landing/MagicBoxDemo';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Learn Any Standard',
      description: 'Upload your style guide and let AI learn your specific requirements',
      icon: '📚',
    },
    {
      title: 'AI Mentor',
      description: 'Get real-time guidance and suggestions as you work',
      icon: '🤖',
    },
    {
      title: 'Full Compliance Suite',
      description: 'Check formatting, citations, structure, and more',
      icon: '✅',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'PhD Student',
      avatar: '👩‍🎓',
      content: 'DocuMentor saved me hours on thesis formatting. The AI mentor is incredibly helpful!',
      rating: 5,
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Research Professor',
      avatar: '👨‍🏫',
      content: 'Perfect for maintaining consistency across multiple research papers.',
      rating: 5,
    },
    {
      name: 'Jessica Park',
      role: 'Business Analyst',
      avatar: '👩‍💼',
      content: 'Our team reports look professional and consistent thanks to DocuMentor.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '5 documents per month',
        'Basic formatting checks',
        'Standard templates',
        'Email support',
      ],
      buttonText: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      features: [
        'Unlimited documents',
        'Advanced AI mentor',
        'Custom style guides',
        'Priority support',
        'Team collaboration',
        'Export to all formats',
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Advanced integrations',
        'Custom branding',
        'Dedicated support',
        'SSO authentication',
        'Advanced analytics',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DocuMentor</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </button>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900"
              >
                Pricing
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                Demo Login
              </button>
              <Button onClick={() => navigate('/dashboard')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your <span className="text-blue-600">AI Document</span> Mentor
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform messy documents into perfectly formatted, compliant masterpieces 
                with intelligent AI guidance and real-time feedback.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center space-x-4"
            >
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Try It Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magic Box Demo */}
      <MagicBoxDemo />

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI-driven tools that understand your content and help you create 
              professional, compliant documents effortlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Students, Researchers, and Professionals
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more power
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-xl p-6 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200' 
                    : 'bg-white border border-gray-200'
                } shadow-lg relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {plan.price}
                    <span className="text-base font-normal text-gray-600">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="w-full"
                  variant={plan.popular ? 'primary' : 'outline'}
                  onClick={() => navigate('/dashboard')}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who've already improved their document workflow
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
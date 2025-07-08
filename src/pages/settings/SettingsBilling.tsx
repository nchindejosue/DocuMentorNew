import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Star, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/Layout/Navbar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SettingsBilling: React.FC = () => {
  const { user } = useAuthStore();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      current: user?.subscription === 'free',
      features: ['5 documents per month', 'Basic formatting', 'Email support'],
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      current: user?.subscription === 'pro',
      features: ['Unlimited documents', 'AI mentor', 'Priority support', 'Team collaboration'],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      current: user?.subscription === 'enterprise',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SSO'],
    },
  ];

  const invoices = [
    { id: '1', date: '2024-01-01', amount: '$19.00', status: 'Paid' },
    { id: '2', date: '2023-12-01', amount: '$19.00', status: 'Paid' },
    { id: '3', date: '2023-11-01', amount: '$19.00', status: 'Paid' },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and billing information</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.subscription === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </h3>
                    <p className="text-gray-600">
                      {user?.subscription === 'pro' ? '$19/month' : 'Free forever'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{user?.credits}</div>
                    <div className="text-sm text-gray-600">credits remaining</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plans */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Plans</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`p-4 rounded-lg border-2 ${
                        plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <div className="text-2xl font-bold text-gray-900">
                          {plan.price}
                          <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={plan.current ? 'secondary' : 'primary'}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Method */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</div>
                    <div className="text-xs text-gray-600">Expires 12/25</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Update Payment Method
                </Button>
              </div>
            </Card>

            {/* Credits */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy Credits</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Need more credits? Purchase additional credits for your account.
                </p>
                <Button variant="warning" size="sm" className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Buy 100 Credits - $10
                </Button>
              </div>
            </Card>

            {/* Invoices */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
                        <div className="text-xs text-gray-600">{invoice.date}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBilling;
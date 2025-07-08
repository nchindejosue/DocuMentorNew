import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import DistributoryLandingPage from './pages/DistributoryLandingPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/workspace/ProjectWorkspace';
import SettingsProfile from './pages/settings/SettingsProfile';
import SettingsBilling from './pages/settings/SettingsBilling';
import TemplatesPage from './pages/TemplatesPage';
import ToolsPage from './pages/ToolsPage';
import CollaborationPage from './pages/CollaborationPage';

// Mock auth component for demo purposes
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  // For demo purposes, we'll simulate an authenticated user
  React.useEffect(() => {
    const { setUser } = useAuthStore.getState();
    if (!isAuthenticated) {
      setUser({
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        persona: 'student',
        credits: 85,
        subscription: 'pro',
      });
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DistributoryLandingPage />} />
          <Route path="/web-platform" element={<LandingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/project/:projectId" 
            element={
              <AuthGuard>
                <ProjectWorkspace />
              </AuthGuard>
            } 
          />
          <Route 
            path="/settings/profile" 
            element={
              <AuthGuard>
                <SettingsProfile />
              </AuthGuard>
            } 
          />
          <Route 
            path="/settings/billing" 
            element={
              <AuthGuard>
                <SettingsBilling />
              </AuthGuard>
            } 
          />
          <Route 
            path="/templates/:category" 
            element={
              <AuthGuard>
                <TemplatesPage />
              </AuthGuard>
            } 
          />
          <Route 
            path="/tools/:tool" 
            element={
              <AuthGuard>
                <ToolsPage />
              </AuthGuard>
            } 
          />
          <Route 
            path="/collaboration" 
            element={
              <AuthGuard>
                <CollaborationPage />
              </AuthGuard>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
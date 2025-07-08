export interface User {
  id: string;
  email: string;
  name: string;
  persona: 'student' | 'researcher' | 'business' | 'writer';
  credits: number;
  subscription: 'free' | 'pro' | 'enterprise';
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'draft';
  complianceScore: number;
  lastModified: string;
  documentsCount: number;
  collaborators: string[];
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  type: 'docx' | 'pdf' | 'txt';
  role: 'document' | 'standard';
  size: number;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
  content?: File; // Store the actual file content for processing
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  elementId?: string;
  fixable: boolean;
}

export interface DocumentHealth {
  overallScore: number;
  items: ComplianceItem[];
  categories: {
    formatting: number;
    style: number;
    structure: number;
    compliance: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  isProcessing?: boolean;
}
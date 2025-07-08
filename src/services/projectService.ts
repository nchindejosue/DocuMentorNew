import api from './api';
import { Project, Document, DocumentHealth } from '../types';

// Mock data for demo purposes
const mockProjects: Project[] = [
  {
    id: 'new-project-demo',
    title: 'New Project Demo',
    description: 'A demonstration project for testing document uploads',
    status: 'active',
    complianceScore: 85,
    lastModified: new Date().toISOString(),
    documentsCount: 0,
    collaborators: ['user-1'],
  },
  {
    id: 'guided-authoring-demo',
    title: 'Guided Authoring Demo',
    description: 'AI-assisted writing demonstration',
    status: 'active',
    complianceScore: 92,
    lastModified: new Date(Date.now() - 86400000).toISOString(),
    documentsCount: 2,
    collaborators: ['user-1', 'user-2'],
  },
];

const mockDocumentHealth: DocumentHealth = {
  overallScore: 75,
  categories: {
    formatting: 80,
    style: 70,
    structure: 85,
    compliance: 65,
  },
  items: [
    {
      id: '1',
      title: 'Heading Structure',
      description: 'Document uses proper heading hierarchy',
      status: 'pass',
      fixable: false,
    },
    {
      id: '2',
      title: 'Font Consistency',
      description: 'Multiple fonts detected - should use consistent font family',
      status: 'fail',
      fixable: true,
    },
    {
      id: '3',
      title: 'Citation Format',
      description: 'Citations need to follow APA format',
      status: 'warning',
      fixable: true,
    },
    {
      id: '4',
      title: 'Margin Settings',
      description: 'Document margins are correctly set',
      status: 'pass',
      fixable: false,
    },
  ],
};

export const projectService = {
  async getProjects(): Promise<Project[]> {
    // Return mock data for demo
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProjects), 500);
    });
  },

  async getProject(id: string): Promise<Project> {
    // Return mock project for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = mockProjects.find(p => p.id === id);
        if (project) {
          resolve(project);
        } else {
          reject(new Error('Project not found'));
        }
      }, 500);
    });
  },

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  async getDocuments(projectId: string): Promise<Document[]> {
    // Return empty array for new projects
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 300);
    });
  },

  async uploadDocument(projectId: string, file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/projects/${projectId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async downloadDocument(documentId: string): Promise<Blob> {
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async getDocumentHealth(documentId: string): Promise<DocumentHealth> {
    // Return mock document health for demo
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDocumentHealth), 800);
    });
  },

  async executeCommand(documentId: string, command: string) {
    const response = await api.post(`/documents/${documentId}/commands`, { command });
    return response.data;
  },
};
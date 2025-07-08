import api from './api';
import { Project, Document, DocumentHealth } from '../types';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get('/projects');
    return response.data;
  },

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  async getDocuments(projectId: string): Promise<Document[]> {
    const response = await api.get(`/projects/${projectId}/documents`);
    return response.data;
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
    const response = await api.get(`/documents/${documentId}/health`);
    return response.data;
  },

  async executeCommand(documentId: string, command: string) {
    const response = await api.post(`/documents/${documentId}/commands`, { command });
    return response.data;
  },
};
import api from './api';
import { Document } from '../types';

export const documentService = {
  async uploadDocument(projectId: string, file: File): Promise<Document> {
    // For demo purposes, we'll simulate the upload and return a mock document
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockDocument: Document = {
          id: `doc-${Date.now()}`,
          projectId,
          title: file.name,
          type: file.name.split('.').pop() as 'docx' | 'pdf' | 'txt',
          role: 'document',
          size: file.size,
          uploadedAt: new Date().toISOString(),
          status: 'ready',
          content: file, // Store the actual file for processing
        };
        resolve(mockDocument);
      }, 1500); // Simulate upload time
    });
  },

  async processDocument(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          resolve(''); // For binary files, we'll handle them differently
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      // Read file based on type
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  },

  async downloadDocument(documentId: string): Promise<Blob> {
    // In a real implementation, this would fetch from the API
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async getDocumentContent(document: Document): Promise<string> {
    if (!document.content) return '';
    
    const file = document.content as File;
    
    if (document.type === 'txt') {
      return this.processDocument(file);
    } else if (document.type === 'docx') {
      // In a real implementation, you would use mammoth.js here
      return this.processDocument(file);
    }
    
    return '';
  },
};
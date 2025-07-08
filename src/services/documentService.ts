import api from './api';
import { Document } from '../types';
import mammoth from 'mammoth';

export const documentService = {
  async uploadDocument(projectId: string, file: File): Promise<Document> {
    return new Promise(async (resolve) => {
      try {
        // Process the file content immediately
        let processedContent = '';
        const fileType = file.name.split('.').pop()?.toLowerCase() as 'docx' | 'pdf' | 'txt';
        
        if (fileType === 'txt') {
          processedContent = await this.readTextFile(file);
        } else if (fileType === 'docx') {
          processedContent = await this.readDocxFile(file);
        } else if (fileType === 'pdf') {
          processedContent = 'PDF_CONTENT'; // PDF will be handled by react-pdf
        }

        setTimeout(() => {
          const mockDocument: Document = {
            id: `doc-${Date.now()}`,
            projectId,
            title: file.name,
            type: fileType,
            role: 'document',
            size: file.size,
            uploadedAt: new Date().toISOString(),
            status: 'ready',
            content: file, // Store the actual file for processing
            processedContent, // Store processed content for immediate display
          };
          resolve(mockDocument);
        }, 1500); // Simulate upload time
      } catch (error) {
        console.error('Error processing file:', error);
        // Still create document even if processing fails
        setTimeout(() => {
          const mockDocument: Document = {
            id: `doc-${Date.now()}`,
            projectId,
            title: file.name,
            type: file.name.split('.').pop() as 'docx' | 'pdf' | 'txt',
            role: 'document',
            size: file.size,
            uploadedAt: new Date().toISOString(),
            status: 'error',
            content: file,
          };
          resolve(mockDocument);
        }, 1500);
      }
    });
  },

  async readTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || '');
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  },

  async readDocxFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          resolve(result.value);
        } catch (error) {
          console.error('Error converting DOCX:', error);
          resolve('<p>Error reading DOCX file. Please try again.</p>');
        }
      };
      reader.onerror = () => reject(new Error('Failed to read DOCX file'));
      reader.readAsArrayBuffer(file);
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
    // Return processed content if available
    if (document.processedContent) {
      return document.processedContent;
    }
    
    if (!document.content) return '';
    
    const file = document.content as File;
    
    if (document.type === 'txt') {
      return this.readTextFile(file);
    } else if (document.type === 'docx') {
      return this.readDocxFile(file);
    }
    
    return '';
  },
};
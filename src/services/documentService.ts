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
          const result = await mammoth.convertToHtml({ 
            arrayBuffer,
            options: {
              styleMap: [
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh",
                "p[style-name='Heading 3'] => h3:fresh",
                "p[style-name='Heading 4'] => h4:fresh",
                "p[style-name='Heading 5'] => h5:fresh",
                "p[style-name='Heading 6'] => h6:fresh",
                "p[style-name='Title'] => h1.title:fresh",
                "p[style-name='Subtitle'] => h2.subtitle:fresh",
                "p[style-name='Quote'] => blockquote:fresh",
                "p[style-name='Intense Quote'] => blockquote.intense:fresh",
                "p[style-name='List Paragraph'] => p.list-paragraph:fresh",
                "r[style-name='Strong'] => strong",
                "r[style-name='Emphasis'] => em"
              ],
              includeDefaultStyleMap: true,
              convertImage: mammoth.images.imgElement(function(image) {
                return image.read("base64").then(function(imageBuffer) {
                  return {
                    src: "data:" + image.contentType + ";base64," + imageBuffer
                  };
                });
              })
            }
          });
          
          // Clean up the HTML and add proper formatting
          let cleanHtml = result.value;
          
          // Ensure proper paragraph spacing
          cleanHtml = cleanHtml.replace(/<p><\/p>/g, '<br>');
          cleanHtml = cleanHtml.replace(/<p>/g, '<p style="margin-bottom: 1em; line-height: 1.6;">');
          
          // Style headings
          cleanHtml = cleanHtml.replace(/<h1>/g, '<h1 style="font-size: 2em; font-weight: bold; margin: 1.5em 0 0.5em 0; color: #1f2937;">');
          cleanHtml = cleanHtml.replace(/<h2>/g, '<h2 style="font-size: 1.5em; font-weight: bold; margin: 1.3em 0 0.5em 0; color: #1f2937;">');
          cleanHtml = cleanHtml.replace(/<h3>/g, '<h3 style="font-size: 1.25em; font-weight: bold; margin: 1.2em 0 0.5em 0; color: #1f2937;">');
          cleanHtml = cleanHtml.replace(/<h4>/g, '<h4 style="font-size: 1.1em; font-weight: bold; margin: 1.1em 0 0.5em 0; color: #1f2937;">');
          
          // Style lists
          cleanHtml = cleanHtml.replace(/<ul>/g, '<ul style="margin: 1em 0; padding-left: 2em; list-style-type: disc;">');
          cleanHtml = cleanHtml.replace(/<ol>/g, '<ol style="margin: 1em 0; padding-left: 2em; list-style-type: decimal;">');
          cleanHtml = cleanHtml.replace(/<li>/g, '<li style="margin: 0.5em 0;">');
          
          // Style blockquotes
          cleanHtml = cleanHtml.replace(/<blockquote>/g, '<blockquote style="margin: 1.5em 0; padding: 1em; border-left: 4px solid #d1d5db; background-color: #f9fafb; font-style: italic;">');
          
          // Style strong and emphasis
          cleanHtml = cleanHtml.replace(/<strong>/g, '<strong style="font-weight: bold;">');
          cleanHtml = cleanHtml.replace(/<em>/g, '<em style="font-style: italic;">');
          
          resolve(cleanHtml);
        } catch (error) {
          console.error('Error converting DOCX:', error);
          resolve('<p style="color: #ef4444;">Error reading DOCX file. Please try again.</p>');
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
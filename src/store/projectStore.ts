import { create } from 'zustand';
import { Project, Document, DocumentHealth } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  currentDocument: Document | null;
  documents: Document[];
  documentHealth: DocumentHealth | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project) => void;
  setCurrentDocument: (document: Document) => void;
  setDocuments: (documents: Document[]) => void;
  setDocumentHealth: (health: DocumentHealth) => void;
  setLoading: (loading: boolean) => void;
  addDocument: (document: Document) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  currentDocument: null,
  documents: [],
  documentHealth: null,
  isLoading: false,
  
  setProjects: (projects) => set({ projects: Array.isArray(projects) ? projects : [] }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentDocument: (document) => set({ currentDocument: document }),
  setDocuments: (documents) => set({ documents: Array.isArray(documents) ? documents : [] }),
  setDocumentHealth: (health) => set({ documentHealth: health }),
  setLoading: (loading) => set({ isLoading: loading }),
  addDocument: (document) => set((state) => ({ 
    documents: [...state.documents, document] 
  })),
}));
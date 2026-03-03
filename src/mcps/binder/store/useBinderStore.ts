import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GeneratedAnswer {
    topicId: string;
    question: string;
    explanation: string;
    analogy: string;
    example: string;
    examQuestion: string;
    summary: string;
    generatedAt: number;
}

export interface BinderDocument {
    id: string;
    name: string;
    uploadedAt: number;
    questions: string[];
}

interface BinderState {
    documents: BinderDocument[];
    answers: Record<string, GeneratedAnswer>; // Keyed by question or a hash

    addDocument: (doc: BinderDocument) => void;
    removeDocument: (docId: string) => void;

    renameDocument: (docId: string, newName: string) => void;
    updateDocumentQuestions: (docId: string, questions: string[]) => void;

    saveAnswer: (question: string, answer: GeneratedAnswer) => void;
    getAnswer: (question: string) => GeneratedAnswer | undefined;

    clearAll: () => void;
}

export const useBinderStore = create<BinderState>()(
    persist(
        (set, get) => ({
            documents: [],
            answers: {},

            addDocument: (doc) => set((state) => ({
                documents: [doc, ...state.documents]
            })),

            removeDocument: (docId) => set((state) => ({
                documents: state.documents.filter(d => d.id !== docId)
            })),

            renameDocument: (docId, newName) => set((state) => ({
                documents: state.documents.map(doc =>
                    doc.id === docId ? { ...doc, name: newName } : doc
                )
            })),

            updateDocumentQuestions: (docId, questions) => set((state) => ({
                documents: state.documents.map(doc =>
                    doc.id === docId ? { ...doc, questions } : doc
                )
            })),

            saveAnswer: (question, answer) => set((state) => ({
                answers: {
                    ...state.answers,
                    [question]: answer
                }
            })),

            getAnswer: (question) => {
                return get().answers[question];
            },

            clearAll: () => set({ documents: [], answers: {} })
        }),
        {
            name: 'hils-binder-storage',
            version: 1,
        }
    )
);

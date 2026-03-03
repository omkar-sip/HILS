import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    UploadCloud, FileText,
    Loader2, AlertTriangle, Zap, Trash2, BookOpen
} from 'lucide-react'
import { useBinderStore } from '@/mcps/binder/store/useBinderStore';
import { parseDocumentFile } from '@/mcps/binder/services/binderService';
import PlaylistCard from '@/mcps/binder/components/PlaylistCard';

export default function StudyBinderPage() {
    const navigate = useNavigate();
    const { documents, addDocument, removeDocument } = useBinderStore();

    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        await processFile(file)
    }

    const processFile = async (file: File) => {
        // Validate
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
            setUploadError("Please upload an Image or PDF file.")
            return
        }

        setIsUploading(true)
        setUploadError(null)

        try {
            const extractedQuestions = await parseDocumentFile(file)

            if (!extractedQuestions || extractedQuestions.length === 0) {
                setUploadError("Could not find any clear questions in this document.")
                setIsUploading(false)
                return
            }

            addDocument({
                id: crypto.randomUUID(),
                name: file.name,
                uploadedAt: Date.now(),
                questions: extractedQuestions
            })

            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (err: any) {
            console.error("Upload error:", err)
            setUploadError(err.message || "Failed to process document.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-hils-text mb-2 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-hils-accent" />
                    Study Binder
                </h1>
                <p className="text-sm text-hils-text-muted">
                    Upload your professor's handwritten important questions or a past paper.
                    Our Vision AI will extract the questions and create a customized revision playlist for you.
                </p>
            </div>

            {/* Upload Zone */}
            <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 mb-10
                    ${isDragging ? 'border-hils-accent bg-hils-accent/10 scale-[1.02]' : 'border-hils-border bg-hils-surface hover:border-white/20'}
                    ${isUploading ? 'opacity-50 pointer-events-none' : ''}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) processFile(file);
                }}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleFileSelect}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-hils-accent animate-spin mb-4" />
                        <h3 className="text-hils-text font-semibold mb-1">Analyzing Document...</h3>
                        <p className="text-hils-text-dim text-sm">Gemini Vision is extracting your questions</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-hils-border/50 flex items-center justify-center mb-4">
                            <UploadCloud className="w-8 h-8 text-hils-text-muted" />
                        </div>
                        <h3 className="text-hils-text font-semibold mb-1">Click or drag a file here</h3>
                        <p className="text-hils-text-dim text-sm">Supports Images (PNG, JPG) and PDFs</p>
                    </div>
                )}

                {/* Error Banner */}
                <AnimatePresence>
                    {uploadError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute -bottom-16 left-0 right-0 glass-card p-3 border border-hils-danger/20 bg-hils-danger/10 text-hils-danger flex items-center justify-center gap-2"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">{uploadError}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Playlists (Extracted Documents) */}
            {documents.length > 0 && (
                <div className="space-y-8">
                    <h2 className="text-xl font-bold text-hils-text border-b border-hils-border pb-2">Your Revision Playlists</h2>

                    {documents.map((doc) => (
                        <PlaylistCard key={doc.id} doc={doc} />
                    ))}
                </div>
            )}

            {documents.length === 0 && !isUploading && (
                <div className="text-center py-12 px-4">
                    <p className="text-hils-text-dim text-sm">
                        No documents uploaded yet. Start building your custom AI study guide above.
                    </p>
                </div>
            )}
        </div>
    )
}

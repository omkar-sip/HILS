import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Trash2, Zap, Edit2, Check, X,
    ChevronDown, ChevronUp, GripVertical, AlertCircle,
    Plus, Combine
} from 'lucide-react';
import { BinderDocument, useBinderStore } from '@/mcps/binder/store/useBinderStore';

interface PlaylistCardProps {
    doc: BinderDocument;
}

export default function PlaylistCard({ doc }: PlaylistCardProps) {
    const navigate = useNavigate();
    const { removeDocument, renameDocument, updateDocumentQuestions } = useBinderStore();

    const [isExpanded, setIsExpanded] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Edit state
    const [editName, setEditName] = useState(doc.name);
    const [editQuestions, setEditQuestions] = useState<string[]>(doc.questions);

    // Sync state if doc changes externally while not editing
    useEffect(() => {
        if (!isEditing) {
            setEditName(doc.name);
            setEditQuestions(doc.questions);
        }
    }, [doc, isEditing]);

    const handleSave = () => {
        // Filter out empty questions
        const filteredQ = editQuestions.filter(q => q.trim() !== '');
        renameDocument(doc.id, editName.trim() || 'Untitled Playlist');
        updateDocumentQuestions(doc.id, filteredQ);
        setIsEditing(false);
        // Ensure expanded if we just saved
        setIsExpanded(true);
    };

    const handleCancel = () => {
        setEditName(doc.name);
        setEditQuestions(doc.questions);
        setIsEditing(false);
    };

    const handleDeleteQuestion = (index: number) => {
        setEditQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpdateQuestion = (index: number, newText: string) => {
        setEditQuestions(prev => {
            const copy = [...prev];
            copy[index] = newText;
            return copy;
        });
    };

    const handleMergeWithNext = (index: number) => {
        if (index >= editQuestions.length - 1) return;
        setEditQuestions(prev => {
            const nextItem = prev[index + 1] || '';
            const currentItem = prev[index] || '';
            const mergedText = currentItem.trim() + '\n' + nextItem.trim();
            const copy = [...prev];
            copy[index] = mergedText;
            copy.splice(index + 1, 1);
            return copy;
        });
    };

    const handleAddNewQuestion = () => {
        setEditQuestions(prev => [...prev, '']);
    };

    return (
        <div className="glass-card overflow-hidden transition-all duration-300">
            {/* Header */}
            <div
                className={`p-4 bg-white/[0.02] border-b border-hils-border flex items-center justify-between transition-colors ${!isEditing && 'cursor-pointer hover:bg-white/[0.05]'}`}
                onClick={() => !isEditing && setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {!isEditing && (
                        <button className="p-1 rounded hover:bg-white/[0.1] text-hils-text-dim transition-colors">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    )}

                    <div className="p-2 rounded bg-white/[0.05] flex-shrink-0">
                        <FileText className="w-5 h-5 text-hils-text-muted" />
                    </div>

                    {isEditing ? (
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-hils-surface border border-hils-accent rounded-lg px-3 py-1.5 text-sm font-semibold text-hils-text focus:outline-none focus:ring-1 focus:ring-hils-accent w-full max-w-sm"
                            placeholder="Playlist Name"
                            autoFocus
                        />
                    ) : (
                        <div className="truncate">
                            <h3 className="font-semibold text-hils-text text-sm truncate">{doc.name}</h3>
                            <p className="text-xs text-hils-text-dim mt-0.5">
                                {doc.questions.length} questions extracted • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 ml-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="p-2 text-hils-text-dim hover:text-hils-text hover:bg-white/[0.1] rounded-lg transition-colors flex items-center gap-1"
                                title="Cancel"
                            >
                                <X className="w-4 h-4" /> <span className="text-xs font-medium hidden sm:inline">Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="p-2 text-hils-success hover:bg-hils-success/10 rounded-lg transition-colors flex items-center gap-1"
                                title="Save Playlist"
                            >
                                <Check className="w-4 h-4" /> <span className="text-xs font-medium hidden sm:inline">Save</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setIsEditing(true); setIsExpanded(true); }}
                                className="p-2 text-hils-text-dim hover:text-hils-accent hover:bg-hils-accent/10 rounded-lg transition-colors"
                                title="Edit Playlist"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => removeDocument(doc.id)}
                                className="p-2 text-hils-text-dim hover:text-hils-danger hover:bg-hils-danger/10 rounded-lg transition-colors"
                                title="Delete Playlist"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Questions List */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {isEditing ? (
                            <div className="p-4 bg-hils-background/50">
                                <p className="text-xs text-hils-text-dim mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Drag the grip icon to reorder. Edit text directly.
                                </p>

                                <Reorder.Group
                                    values={editQuestions}
                                    onReorder={setEditQuestions}
                                    className="space-y-3"
                                >
                                    {editQuestions.map((q, idx) => (
                                        <Reorder.Item
                                            key={idx + "-" + q.substring(0, 10)}
                                            value={q}
                                            className="flex gap-3 bg-hils-surface border border-hils-border rounded-xl p-3 shadow-sm relative group cursor-auto"
                                            dragListener={false} // Disable drag on the whole item, enable on handle
                                        >
                                            <div className="flex flex-col gap-2 mt-2">
                                                <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/[0.1] rounded text-hils-text-muted" data-drag-handle>
                                                    <GripVertical className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-mono text-hils-text-dim text-center">{idx + 1}</span>
                                            </div>

                                            <div className="flex-1 flex flex-col gap-2">
                                                <textarea
                                                    value={q}
                                                    onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                                                    className="w-full bg-transparent border border-transparent hover:border-hils-border focus:border-hils-accent rounded-lg p-2 text-sm text-hils-text resize-y min-h-[60px] focus:outline-none transition-colors"
                                                    placeholder="Enter question text..."
                                                />
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {idx < editQuestions.length - 1 && (
                                                        <button
                                                            onClick={() => handleMergeWithNext(idx)}
                                                            className="text-xs text-hils-text-dim hover:text-hils-accent flex items-center gap-1 px-2 py-1 rounded bg-white/[0.05] hover:bg-hils-accent/10 transition-colors"
                                                            title="Merge with next question below"
                                                        >
                                                            <Combine className="w-3.5 h-3.5" /> Merge Down
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteQuestion(idx)}
                                                        className="text-xs text-hils-text-dim hover:text-hils-danger flex items-center gap-1 px-2 py-1 rounded bg-white/[0.05] hover:bg-hils-danger/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>

                                <button
                                    onClick={handleAddNewQuestion}
                                    className="mt-4 w-full py-3 border-2 border-dashed border-hils-border hover:border-hils-accent/50 rounded-xl flex flex-col items-center justify-center gap-1 text-hils-text-muted hover:text-hils-accent hover:bg-hils-accent/5 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="text-sm font-medium">Add New Question</span>
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-hils-border">
                                {doc.questions.length === 0 ? (
                                    <div className="p-8 text-center text-sm text-hils-text-dim">
                                        No questions available. Click edit to add some.
                                    </div>
                                ) : (
                                    doc.questions.map((q, idx) => (
                                        <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="mt-0.5 text-hils-text-dim text-xs font-mono">{idx + 1}.</div>
                                                <p className="text-sm text-hils-text leading-relaxed whitespace-pre-wrap">{q}</p>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/topic/custom?q=${encodeURIComponent(q)}`)}
                                                className="btn-primary py-2 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 flex-shrink-0 self-start sm:self-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                            >
                                                <Zap className="w-3.5 h-3.5" />
                                                Generate Answer
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

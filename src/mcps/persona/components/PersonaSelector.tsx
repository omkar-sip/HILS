import { usePersonaStore } from '../store/usePersonaStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function PersonaSelector() {
    const { activePersona, personas, setPersona } = usePersonaStore()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-hils-surface border border-hils-border
                   hover:border-hils-accent/30 transition-all duration-200"
            >
                <span className="text-lg">{activePersona.emoji}</span>
                <span className="text-sm font-medium text-hils-text">{activePersona.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-hils-text-dim transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 left-0 w-72 glass-card p-2 z-50 shadow-xl"
                    >
                        {personas.map((persona) => (
                            <button
                                key={persona.id}
                                onClick={() => {
                                    setPersona(persona.id)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-150
                  ${activePersona.id === persona.id
                                        ? 'bg-hils-accent/10 border border-hils-accent/20'
                                        : 'hover:bg-hils-surface border border-transparent'
                                    }`}
                            >
                                <span className="text-xl mt-0.5">{persona.emoji}</span>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-hils-text">{persona.name}</p>
                                    <p className="text-xs text-hils-text-dim mt-0.5">{persona.description}</p>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

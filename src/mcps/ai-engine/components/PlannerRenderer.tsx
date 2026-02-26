import React from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import type { AIResponse } from '../types/ai.types'

interface Props {
    response: AIResponse
}

interface MDProp {
    children?: React.ReactNode
}

export default function PlannerRenderer({ response }: Props) {
    if (!response.explanation) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 border border-hils-accent/20"
        >
            <div className="prose prose-invert prose-sm max-w-none text-hils-text leading-relaxed">
                <ReactMarkdown
                    components={{
                        p: ({ children }: MDProp) => <p className="mb-4 last:mb-0">{children}</p>,
                        h1: ({ children }: MDProp) => <h1 className="text-xl font-bold text-hils-accent mb-4 mt-6 first:mt-0">{children}</h1>,
                        h2: ({ children }: MDProp) => <h2 className="text-lg font-bold text-white mb-3 mt-5 first:mt-0">{children}</h2>,
                        h3: ({ children }: MDProp) => <h3 className="text-base font-semibold text-hils-text-muted mb-2 mt-4 first:mt-0">{children}</h3>,
                        ul: ({ children }: MDProp) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                        ol: ({ children }: MDProp) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                        li: ({ children }: MDProp) => <li className="text-hils-text-muted pl-1">{children}</li>,
                        strong: ({ children }: MDProp) => <strong className="font-semibold text-white">{children}</strong>,
                        em: ({ children }: MDProp) => <em className="italic text-hils-text-dim">{children}</em>,
                    }}
                >
                    {response.explanation}
                </ReactMarkdown>
            </div>
        </motion.div>
    )
}

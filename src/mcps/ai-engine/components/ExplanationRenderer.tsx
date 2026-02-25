import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Code2, HelpCircle, FileText } from 'lucide-react'
import type { AIResponse } from '../types/ai.types'

interface Props {
    response: AIResponse
}

const sectionConfig = [
    { key: 'explanation', title: 'Explanation', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { key: 'analogy', title: 'Analogy', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    { key: 'example', title: 'Example', icon: Code2, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { key: 'examQuestion', title: 'Exam Question', icon: HelpCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    { key: 'summary', title: 'Summary', icon: FileText, color: 'text-gray-400', bg: 'bg-white/10', border: 'border-white/10' },
] as const

export default function ExplanationRenderer({ response }: Props) {
    return (
        <div className="space-y-4">
            {sectionConfig.map((section, index) => {
                const content = response[section.key]
                if (!content) return null

                const Icon = section.icon

                return (
                    <motion.div
                        key={section.key}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className={`glass-card p-5 border ${section.border}`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`p-1.5 rounded-lg ${section.bg}`}>
                                <Icon className={`w-4 h-4 ${section.color}`} />
                            </div>
                            <h3 className={`text-sm font-semibold ${section.color} uppercase tracking-wider`}>
                                {section.title}
                            </h3>
                        </div>
                        <div className="text-hils-text text-sm leading-relaxed whitespace-pre-wrap">
                            {content}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

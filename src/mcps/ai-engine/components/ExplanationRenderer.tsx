import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Code2, HelpCircle, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'
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
                        <div className="prose prose-invert prose-sm max-w-none text-hils-text leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                                    h1: ({ children }) => <h1 className="text-xl font-bold text-hils-accent mb-4 mt-6 first:mt-0">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-lg font-bold text-white mb-3 mt-5 first:mt-0">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-base font-semibold text-hils-text-muted mb-2 mt-4 first:mt-0">{children}</h3>,
                                    ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                                    li: ({ children }) => <li className="text-hils-text-muted pl-1">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                    em: ({ children }) => <em className="italic text-hils-text-dim">{children}</em>,
                                    code(props) {
                                        const { children, className, node, ref, ...rest } = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        const isInline = !match && !className;
                                        return !isInline ? (
                                            <SyntaxHighlighter
                                                {...rest}
                                                PreTag="div"
                                                children={String(children).replace(/\n$/, '')}
                                                language={match ? match[1] : 'text'}
                                                style={vscDarkPlus}
                                                className="rounded-md my-4 border border-hils-border !bg-black/50"
                                            />
                                        ) : (
                                            <code {...rest} className="bg-hils-bg border border-hils-border px-1.5 py-0.5 rounded text-hils-accent text-sm">
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

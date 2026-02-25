import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
    end: number
    suffix?: string
    label: string
    duration?: number
}

export default function AnimatedCounter({ end, suffix = '', label, duration = 2 }: Props) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    useEffect(() => {
        if (!isInView) return
        let startTime: number | null = null
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [isInView, end, duration])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <p className="text-4xl md:text-5xl font-bold text-white">
                {count}{suffix}
            </p>
            <p className="text-sm text-hils-text-muted mt-2">{label}</p>
        </motion.div>
    )
}

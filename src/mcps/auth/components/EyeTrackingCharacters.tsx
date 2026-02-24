import { useRef, useEffect, useCallback } from 'react'

interface EyeTrackingCharactersProps {
    mousePos: { x: number; y: number }
    /** 'email' | 'password' | null — when truthy the characters look down at the form */
    focusedField: string | null
}

// ── helpers ──
function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val))
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
}

// ── single eye component ──
function Eye({
    cx,
    cy,
    socketRx,
    socketRy,
    pupilR,
    maxOffset,
    targetX,
    targetY,
    color = '#111',
}: {
    cx: number
    cy: number
    socketRx: number
    socketRy: number
    pupilR: number
    maxOffset: number
    targetX: number
    targetY: number
    color?: string
}) {
    const pupilRef = useRef<SVGCircleElement>(null)
    const currentPos = useRef({ x: 0, y: 0 })
    const rafId = useRef<number>(0)

    const animate = useCallback(() => {
        const dx = targetX - cx
        const dy = targetY - cy
        const angle = Math.atan2(dy, dx)
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxOffset * 60)
        const ratio = dist / (maxOffset * 60)
        const offsetX = Math.cos(angle) * maxOffset * ratio
        const offsetY = Math.sin(angle) * maxOffset * ratio

        currentPos.current.x = lerp(currentPos.current.x, offsetX, 0.12)
        currentPos.current.y = lerp(currentPos.current.y, offsetY, 0.12)

        if (pupilRef.current) {
            pupilRef.current.setAttribute('cx', String(cx + currentPos.current.x))
            pupilRef.current.setAttribute('cy', String(cy + currentPos.current.y))
        }

        rafId.current = requestAnimationFrame(animate)
    }, [cx, cy, maxOffset, targetX, targetY])

    useEffect(() => {
        rafId.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafId.current)
    }, [animate])

    return (
        <>
            {/* eye socket */}
            <ellipse cx={cx} cy={cy} rx={socketRx} ry={socketRy} fill="white" />
            {/* pupil */}
            <circle ref={pupilRef} cx={cx} cy={cy} r={pupilR} fill={color} />
        </>
    )
}

// ── character config ──
interface CharacterDef {
    id: string
    shape: 'circle' | 'roundRect' | 'tallRect' | 'shortRect'
    color: string
    x: number
    y: number
    w: number
    h: number
    eyes: { cx: number; cy: number; socketRx: number; socketRy: number; pupilR: number; maxOff: number }[]
    mouth?: { cx: number; cy: number; type: 'smile' | 'line' | 'dot' }
    r?: number
}

const CHARACTERS: CharacterDef[] = [
    // Orb (large circle, bottom-left) — coral/red
    {
        id: 'orb',
        shape: 'circle',
        color: '#f87171',
        x: 150,
        y: 330,
        w: 0,
        h: 0,
        r: 130,
        eyes: [
            { cx: 120, cy: 300, socketRx: 12, socketRy: 14, pupilR: 6, maxOff: 6 },
            { cx: 170, cy: 300, socketRx: 12, socketRy: 14, pupilR: 6, maxOff: 6 },
        ],
        mouth: { cx: 145, cy: 350, type: 'dot' },
    },
    // Blocky (tall purple rectangle)
    {
        id: 'blocky',
        shape: 'tallRect',
        color: '#7c3aed',
        x: 200,
        y: 120,
        w: 120,
        h: 270,
        eyes: [
            { cx: 232, cy: 210, socketRx: 12, socketRy: 15, pupilR: 7, maxOff: 6 },
            { cx: 280, cy: 210, socketRx: 12, socketRy: 15, pupilR: 7, maxOff: 6 },
        ],
    },
    // Slim (narrow rectangle) — yellow
    {
        id: 'slim',
        shape: 'tallRect',
        color: '#facc15',
        x: 310,
        y: 180,
        w: 80,
        h: 230,
        eyes: [
            { cx: 332, cy: 260, socketRx: 9, socketRy: 11, pupilR: 5, maxOff: 5 },
            { cx: 365, cy: 260, socketRx: 9, socketRy: 11, pupilR: 5, maxOff: 5 },
        ],
        mouth: { cx: 348, cy: 300, type: 'line' },
    },
    // Buddy (short green rounded rectangle)
    {
        id: 'buddy',
        shape: 'shortRect',
        color: '#22c55e',
        x: 350,
        y: 260,
        w: 110,
        h: 160,
        eyes: [
            { cx: 382, cy: 310, socketRx: 8, socketRy: 9, pupilR: 4.5, maxOff: 4 },
            { cx: 418, cy: 310, socketRx: 8, socketRy: 9, pupilR: 4.5, maxOff: 4 },
        ],
        mouth: { cx: 400, cy: 348, type: 'line' },
    },
]

export default function EyeTrackingCharacters({ mousePos, focusedField }: EyeTrackingCharactersProps) {
    const svgRef = useRef<SVGSVGElement>(null)

    // Compute target for eyes: either the mouse or a "look down" position when input is focused
    const getTarget = useCallback(() => {
        if (focusedField) {
            // When a field is focused, characters look to the right and down (toward the form)
            return { x: 600, y: 500 }
        }

        if (!svgRef.current) return { x: 250, y: 250 }

        const rect = svgRef.current.getBoundingClientRect()
        const svgX = ((mousePos.x - rect.left) / rect.width) * 500
        const svgY = ((mousePos.y - rect.top) / rect.height) * 500
        return { x: svgX, y: svgY }
    }, [mousePos, focusedField])

    const target = getTarget()

    // Body sway: slight rotation toward mouse
    const getBodyRotation = useCallback(
        (charX: number) => {
            const dx = target.x - charX
            return clamp(dx * 0.008, -3, 3)
        },
        [target.x]
    )

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 550 520"
            className="w-full h-full max-h-[650px]"
            aria-hidden="true"
        >
            {/* Subtle glow behind characters */}
            <defs>
                <radialGradient id="bg-glow" cx="50%" cy="70%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect x="0" y="0" width="550" height="520" fill="url(#bg-glow)" />

            {/* White base / platform */}
            <ellipse cx="280" cy="470" rx="200" ry="22" fill="white" opacity="0.12" />
            <ellipse cx="280" cy="470" rx="160" ry="14" fill="white" opacity="0.06" />

            {CHARACTERS.map((char) => {
                const rot = getBodyRotation(char.x + (char.w || 0) / 2)
                const pivotX = char.x + (char.w || 0) / 2
                const pivotY = char.y + (char.h || 0)

                return (
                    <g
                        key={char.id}
                        style={{
                            transform: `rotate(${rot}deg)`,
                            transformOrigin: `${pivotX}px ${pivotY}px`,
                            transition: 'transform 0.3s ease-out',
                        }}
                    >
                        {/* Body shape */}
                        {char.shape === 'circle' && (
                            <circle cx={char.x} cy={char.y} r={char.r!} fill={char.color} />
                        )}
                        {(char.shape === 'tallRect' || char.shape === 'shortRect') && (
                            <rect
                                x={char.x}
                                y={char.y}
                                width={char.w}
                                height={char.h}
                                rx={char.shape === 'shortRect' ? 30 : 16}
                                ry={char.shape === 'shortRect' ? 30 : 16}
                                fill={char.color}
                            />
                        )}
                        {char.shape === 'roundRect' && (
                            <rect
                                x={char.x}
                                y={char.y}
                                width={char.w}
                                height={char.h}
                                rx={24}
                                ry={24}
                                fill={char.color}
                            />
                        )}

                        {/* Eyes */}
                        {char.eyes.map((eye, i) => (
                            <Eye
                                key={`${char.id}-eye-${i}`}
                                cx={eye.cx}
                                cy={eye.cy}
                                socketRx={eye.socketRx}
                                socketRy={eye.socketRy}
                                pupilR={eye.pupilR}
                                maxOffset={eye.maxOff}
                                targetX={target.x}
                                targetY={target.y}
                                color="#111"
                            />
                        ))}

                        {/* Mouth */}
                        {char.mouth?.type === 'line' && (
                            <line
                                x1={char.mouth.cx - 10}
                                y1={char.mouth.cy}
                                x2={char.mouth.cx + 10}
                                y2={char.mouth.cy}
                                stroke="#111"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                        )}
                        {char.mouth?.type === 'dot' && (
                            <>
                                <circle cx={char.mouth.cx - 8} cy={char.mouth.cy} r={3} fill="#111" />
                                <circle cx={char.mouth.cx + 8} cy={char.mouth.cy} r={3} fill="#111" />
                            </>
                        )}
                        {char.mouth?.type === 'smile' && (
                            <path
                                d={`M ${char.mouth.cx - 8} ${char.mouth.cy} Q ${char.mouth.cx} ${char.mouth.cy + 8} ${char.mouth.cx + 8} ${char.mouth.cy}`}
                                fill="none"
                                stroke="#111"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                        )}
                    </g>
                )
            })}
        </svg>
    )
}

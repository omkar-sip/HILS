/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                hils: {
                    bg: '#000000',
                    surface: '#0B0B0B',
                    card: '#111111',
                    border: 'rgba(255,255,255,0.08)',
                    accent: '#FFFFFF',
                    'accent-light': '#CFCFCF',
                    'accent-glow': 'rgba(255, 255, 255, 0.06)',
                    text: '#ffffff',
                    'text-muted': '#8A8A8A',
                    'text-dim': '#5A5A5A',
                    success: '#22c55e',
                    warning: '#eab308',
                    danger: '#ef4444',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.25s ease-out',
                'slide-up': 'slideUp 0.25s ease-out',
                'slide-right': 'slideRight 0.25s ease-out',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideRight: {
                    '0%': { opacity: '0', transform: 'translateX(-10px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.06)' },
                    '50%': { boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.12)' },
                },
            },
        },
    },
    plugins: [],
}

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
                    surface: '#0a0a0a',
                    card: '#111111',
                    border: '#1e1e1e',
                    accent: '#7c3aed',
                    'accent-light': '#a78bfa',
                    'accent-glow': 'rgba(124, 58, 237, 0.15)',
                    text: '#ffffff',
                    'text-muted': '#999999',
                    'text-dim': '#555555',
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
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
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
                    '0%, 100%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
                },
            },
        },
    },
    plugins: [],
}

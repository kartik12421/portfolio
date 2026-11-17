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
        // Background / surface
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        elev: 'rgb(var(--c-bg-elev) / <alpha-value>)',
        sunken: 'rgb(var(--c-bg-sunken) / <alpha-value>)',

        // Hairlines
        line: 'rgb(var(--c-border) / <alpha-value>)',
        'line-strong': 'rgb(var(--c-border-strong) / <alpha-value>)',

        // Type
        ink: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-text-muted) / <alpha-value>)',
        faint: 'rgb(var(--c-text-faint) / <alpha-value>)',

        // Accent — cyan, retuned per theme for contrast
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          strong: 'rgb(var(--c-accent-strong) / <alpha-value>)',
          on: 'rgb(var(--c-accent-on) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Fraunces',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        // Editorial scale: tight display sizes, generous body
        'display-lg': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display': ['3.25rem', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-text) / 0.04), 0 12px 28px -24px rgb(var(--c-text) / 0.35)',
        'card-hover': '0 1px 2px rgb(var(--c-text) / 0.05), 0 20px 40px -28px rgb(var(--c-text) / 0.45)',
        pop: '0 24px 64px -32px rgb(var(--c-text) / 0.45)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

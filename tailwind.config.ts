import type { Config } from 'tailwindcss'
import { tailwindTokens } from './lib/tokens'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindTokens.colors,
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: tailwindTokens.spacing,
      borderRadius: tailwindTokens.borderRadius,
      screens: tailwindTokens.screens,
      fontFamily: tailwindTokens.fontFamily,
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // 左侧栏颜色主题 - 非激活状态
    'bg-cyan-500/5', 'bg-cyan-500/20', 'border-cyan-500/20', 'border-cyan-500/50', 'text-cyan-300/80', 'text-cyan-400',
    'bg-orange-500/5', 'bg-orange-500/20', 'border-orange-500/20', 'border-orange-500/50', 'text-orange-300/80', 'text-orange-400',
    'bg-purple-500/5', 'bg-purple-500/20', 'border-purple-500/20', 'border-purple-500/50', 'text-purple-300/80', 'text-purple-400',
    'bg-green-500/5', 'bg-green-500/20', 'border-green-500/20', 'border-green-500/50', 'text-green-300/80', 'text-green-400',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        secondary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
    },
  },
  plugins: [],
}

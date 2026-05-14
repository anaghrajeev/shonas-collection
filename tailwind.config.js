/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "outline": "#877274",
        "on-secondary-container": "#63635f",
        "surface-container-low": "#f6f3f2",
        "on-background": "#1c1b1b",
        "on-error-container": "#93000a",
        "on-tertiary-fixed": "#241a00",
        "on-primary-fixed-variant": "#7d293c",
        "on-tertiary-container": "#4e3d00",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed-dim": "#e9c349",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "background": "#fcf9f8",
        "surface-container-highest": "#e5e2e1",
        "inverse-on-surface": "#f3f0ef",
        "outline-variant": "#dac0c3",
        "on-primary": "#ffffff",
        "on-tertiary-fixed-variant": "#574500",
        "tertiary-fixed": "#ffe088",
        "surface-dim": "#dcd9d9",
        "secondary-fixed": "#e4e2dd",
        "on-surface-variant": "#544244",
        "primary": "#4d021a",
        "secondary-container": "#e1dfdb",
        "inverse-primary": "#ffb2bd",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#ee8194",
        "on-error": "#ffffff",
        "surface-variant": "#e5e2e1",
        "error": "#ba1a1a",
        "surface-tint": "#9b4053",
        "tertiary": "#735c00",
        "on-surface": "#1c1b1b",
        "primary-fixed-dim": "#ffb2bd",
        "surface-container": "#f0eded",
        "tertiary-container": "#cba72f",
        "secondary-fixed-dim": "#c8c6c2",
        "on-secondary-fixed": "#1b1c19",
        "surface-container-high": "#eae7e7",
        "on-secondary-fixed-variant": "#474744",
        "secondary": "#5e5e5b",
        "inverse-surface": "#313030",
        "primary-container": "#6a1a2e",
        "surface-bright": "#fcf9f8",
        "on-primary-fixed": "#400013",
        "primary-fixed": "#ffd9dd",
        "surface": "#fcf9f8"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem",
      },
      spacing: {
        "container-max": "1280px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "base": "8px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        "label-lg": ["Montserrat", "sans-serif"],
        "display-lg": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "label-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "body-md": ["Montserrat", "sans-serif"]
      },
      fontSize: {
        "label-lg": ["14px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        "label-md": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }]
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulseSlow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.25s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

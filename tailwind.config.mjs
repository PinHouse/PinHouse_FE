/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    /** 화면 폭 */
    screens: {
      sm: "100%",
      md: "100%",
      lg: "768px",
    },

    extend: {
      fontFamily: {
        suit: ["var(--font-suit)", ...fontFamily.sans],
      },
      /* 패딩 */
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },

      colors: {
        primary: {
          light: "#3b82f6",
          dark: "#1d4ed8",
        },

        secondary: {
          light: "#6b7280",
          dark: "#374151",
        },

        /* 상태 색상 */
        success: {
          light: "#34d399",
          dark: "#059669",
        },
        warning: {
          light: "#fbbf24",
          dark: "#d97706",
        },
        danger: {
          light: "#f87171",
          dark: "#dc2626",
        },
        info: {
          light: "#60a5fa",
          dark: "#1d4ed8",
        },

        /* 배경/텍스트 계열 */
        background: {
          light: "#f9fafb",
          dark: "#1f2937",
        },
        surface: {
          light: "#ffffff",
          dark: "#111827",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          tertiary: "#9CA3AF",
          brand: "#3182F6",
          inverse: "#FFFFFF",
        },
        log: {
          light: "#306FFF",
          dark: "#f9fafb",
          muted: "#6b7280",
        },
        button: {
          light: "#306FFF",
          dark: "#1E429F",
          active: "#1E429F",
          muted: "#E5E7EB",
          text: "#FFFFFF",
        },
      },
      keyframes: {
        logoBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        logoPop: {
          "0%": { transform: "translateY(0) scale(1)" },
          "30%": { transform: "translateY(-6px) scale(1.05)" },
          "60%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        logoBounce: "logoBounce 1.5s ease-in-out infinite",
        logoPop: "logoPop 0.8s ease-in-out",
      },
    },
  },
  plugins: [],
};

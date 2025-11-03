/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "640px",
      lg: "768px",
    },
    extend: {
      fontFamily: {
        suit: ["var(--font-suit)", ...fontFamily.sans],
      },
      spacing: {
        30: "7.5rem",
        45: "11.25rem",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          light: "#6b7280",
          dark: "#374151",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
        background: "hsl(var(--background))",
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
          muted: "#BBBAC5",
          text: "#FFFFFF",
          tag: "#EFEFF3",
        },
        hover: {
          dropDown: "#E8EDFF",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        logoBounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-3px)",
          },
        },
        logoPop: {
          "0%": {
            transform: "translateY(0) scale(1)",
          },
          "30%": {
            transform: "translateY(-6px) scale(1.05)",
          },
          "60%": {
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        slideOutLeft: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        logoBounce: "logoBounce 1.5s ease-in-out infinite",
        logoPop: "logoPop 0.8s ease-in-out",
        leftMove: "slideOutLeft 0.4s ease-in-out forwards",
        rightMove: "slideInRight 0.4s ease-in-out forwards",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

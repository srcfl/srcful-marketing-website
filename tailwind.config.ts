import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sourceful Brand Colors
        sourceful: {
          green: {
            50: "var(--sourceful-green-50)",
            100: "var(--sourceful-green-100)",
            200: "var(--sourceful-green-200)",
            300: "var(--sourceful-green-300)",
            400: "var(--sourceful-green-400)",
            500: "var(--sourceful-green-500)",
            600: "var(--sourceful-green-600)",
            700: "var(--sourceful-green-700)",
            800: "var(--sourceful-green-800)",
            900: "var(--sourceful-green-900)",
            950: "var(--sourceful-green-950)",
          },
          yellow: {
            50: "var(--sourceful-yellow-50)",
            100: "var(--sourceful-yellow-100)",
            200: "var(--sourceful-yellow-200)",
            300: "var(--sourceful-yellow-300)",
            400: "var(--sourceful-yellow-400)",
            500: "var(--sourceful-yellow-500)",
            600: "var(--sourceful-yellow-600)",
            700: "var(--sourceful-yellow-700)",
            800: "var(--sourceful-yellow-800)",
            900: "var(--sourceful-yellow-900)",
          },
          gray: {
            50: "var(--sourceful-gray-50)",
            100: "var(--sourceful-gray-100)",
            200: "var(--sourceful-gray-200)",
            300: "var(--sourceful-gray-300)",
            400: "var(--sourceful-gray-400)",
            500: "var(--sourceful-gray-500)",
            600: "var(--sourceful-gray-600)",
            700: "var(--sourceful-gray-700)",
            800: "var(--sourceful-gray-800)",
            900: "var(--sourceful-gray-900)",
            950: "var(--sourceful-gray-950)",
          },
        },
        // ShadCN semantic colors mapped to Sourceful tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

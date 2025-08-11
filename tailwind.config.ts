import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        edu: ["var(--font-edu)", "serif"],
      },
      screens: {
        'lg': '1034px',
        'md': '850px', // Custom value for md breakpoint

        // => @media (min-width: 992px) { ... }
      },
      backgroundImage: {
        "easing-gradient":
          "linear-gradient(to bottom, #0d0f11, #121418, #191c20, #191b1f)",
      },
      colors: {
        "row-hover": "#333",
        // "selectedRow": "#212A08",
        primaryGreen: "rgba(var(--primaryGreen))",
        primaryLime: "rgba(var(--primaryLime))",
        txWhite: "rgba(var(--txWhite))",
        "primary-orange": "#F07000",
        primaryDark: "rgba(var(--primaryDark))",
        secondaryBorder: "rgba(var(--secondaryBorder))",
        "secondary-transparent-border": "#616161",
        statusCancelled: "rgba(var(--statusCancelled))",
        textCancelled: "rgba(var(--textCancelled))",
        statusPending : "rgba(var(--statusPending))",
        textPending : "rgba(var(--textPending))",
        statusCompleted :"rgba(var(--statusCompleted))",
        textCompleted :"rgba(var(--textCompleted))",
        secondaryDark: "rgba(var(--secondaryDark))",
        selectedRow: "rgba(var(--selectedRow))",
        secondaryDarker: "rgba(var(--secondaryDarker))",
        "primary-border": "#616161",
        "black-primary": "#020204",
        "black-secondary": "#7f8ea3",
        "black-container": "#030711",
        "item-active": "#0e1629",
        "cancel": "#ec5033",
        "approve": "#41c82e",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

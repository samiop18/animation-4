/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neon: "#00e676",
                dark: "#0a0a0a",
                "deep-gray": "#1a1a1a",
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', "monospace"],
                sans: ['"Inter"', "sans-serif"],
                orbitron: ['"Orbitron"', "sans-serif"],
                geometric: ['"Outfit"', "sans-serif"],
                montserrat: ['"Montserrat"', "sans-serif"],
                poppins: ['"Poppins"', "sans-serif"],
            },
            boxShadow: {
                'neon': '0 0 15px rgba(0, 230, 118, 0.4)',
            }
        },
    },
    plugins: [],
}

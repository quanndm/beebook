// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./app/**/**/*.{js,jsx,ts,tsx}",
        "./app/**/**/**/*.{js,jsx,ts,tsx}",
        "./components/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./components/**/**/*.{js,jsx,ts,tsx}",
        "./components/**/**/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FFC24E",
                secondary: "#2E2E2E",
            },
        },
    },
    plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0c10',
                card: '#161b22',
                accent: {
                    primary: '#3fb950',
                    secondary: '#2188ff',
                },
                terminal: '#0d1117',
            },
        },
    },
    plugins: [],
}

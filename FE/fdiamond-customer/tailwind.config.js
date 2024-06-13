/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                pink: "#B95C50",
                green: "#1A4D2E"
            },

            fontFamily: {
                playfair: ["Playfair Display"],
                lora: ["Lora"],
                gantari: ["Gantari"],
            },

        },
    },
    plugins: [],
};

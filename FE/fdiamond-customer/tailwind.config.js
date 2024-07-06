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
                poppins: ["Poppins"],
            },
            boxShadow: {
                'cartline': 'rgba(27, 27, 27, 0.17) 0px 2px 5px',
                'summary': 'rgba(51, 59, 69, 0.15) 0px 0px 40px',
            }

        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/*/.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        landingPageBackgroundImage:
          "url('/public/cabbage-phuc-long-unsplash.jpg')",
      },
    },
    plugins: [],
  };
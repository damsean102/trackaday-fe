module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            'brand-green': '#81b71a',
        },
      },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
  }

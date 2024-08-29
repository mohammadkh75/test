/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#FBEBB5',
        pink :'#FAF4F4',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },

      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
        },
      },
      fontWeight: {
        thin: '100',
        light: '300',
        regular: '400',
        medium: '500',
        'semi-bold': '600',
        bold: '700',
        black: '900',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '50%',
      },
      fontSize: {
        metadata: '1rem',
        'metadata-limited': '1.2rem',
        base: '1.4rem',
        subject: '1.6rem',
        header: '1.8rem',
        'pane-header': '2rem',
        title: '2.4rem',
        greeting: '3.2rem',
        hero: '4rem',
        'xl-numeric': '6.4rem',
        '8xl': '6rem',
        '4xl' : '2.25rem',
        '6xl' : '3.75rem',
        '3xl' : '2.25rem',
      },
    },
  },
  plugins: [],
}

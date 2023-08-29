/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/app/*.html",
    "./src/pages/**/*.html",
    "./src/components/**/*.html",
    "./src/**/*"
  ],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px',
    },
    extend: {
      colors:{
        main:'#CC9900',
        'color-primary-0':'#FEBFC3',
        'color-primary-1':'#FFE5E7',
        'color-primary-2':'#FED3D5',
        'color-primary-3':'#FDACB0',
        'color-primary-4':'#FD999E',
        second:{
          100:'#003300',
          200:'#339900'
        },
      },
    },
  plugins: [],
}
}


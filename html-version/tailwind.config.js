const colors = require('tailwindcss/colors')

const customColors = {
  'white': colors.white,
  'navy': '#0A1428',            // Added this line
  'dark': '#14213D',            // Updated this line
  'theme': '#FCA311',           // Updated this line
  'gray': '#E5E5E5',            // Updated this line
  'dark-gray': '#3C4151',       // No change
  'light-gray': '#5A5A5A',      // No change
  'white-0.03': 'rgba(255, 255, 255, 0.03)',   // No change
  'white-0.06': 'rgba(255, 255, 255, 0.06)',   // No change
  'white-0.88': 'rgba(255, 255, 255, 0.88)',   // No change
  'white-0.56': 'rgba(255, 255, 255, 0.56)',   // No change
}

module.exports = {
  content: ["./docs/**/*.html", "./docs/assets/custom/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
        'open-sans': ['"Open Sans"']
      },
      textColor: {
        'primary': customColors.white,
        'secondary': customColors.theme,
        'tertiary': customColors['white-0.88'],
        'quaternary': customColors['white-0.56'],
        'quinary': customColors['light-gray'],
        'senary': customColors.dark
      },
      backgroundColor: {
        'primary': customColors.dark,
        'secondary': customColors.gray,
        'tertiary': customColors['dark-gray'],
        'quaternary': customColors['white-0.06'],
        'quinary': customColors['white-0.03'],
        'senary': customColors.theme,
        
      },
      borderColor: {
        'primary': customColors.white,
        'secondary': customColors.theme,
        'tertiary': customColors.dark,

      },
      fill: {
        'primary': customColors.white,
        'secondary': customColors.theme,
        'tertiary': customColors.dark,
        
      }
    },
  },
  plugins: [
    // plugin to sort your class attribute based on tailwindcss standard
    // check the package.json for the command
    require('prettier-plugin-tailwindcss')
  ],
}



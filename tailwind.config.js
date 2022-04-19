const colors = require('tailwindcss/colors');

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            white: colors.white,
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,

            purple: {
                50: '#f2fbf8',
                100: '#eaf8f3',
                200: '#bfeadb',
                300: '#95dcc3',
                400: '#6acdab',
                500: '#40bf94',
                600: '#329573',
                700: '#236a52',
                800: '#154031',
                900: '#071510',
            },
        },
        fontFamily: {
            Rampart: ['Rampart One', 'cursive'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

const colors = {
  black: '#18212e',
  blue: '#449bf7',
  blueDark: '#084a96',
  blueLight: '#20a5ff',
  green: '#13ce66',
  grey: '#777777',
  greyBlue: '#ecf0f9',
  greyDark: '#5e6c82',
  greyLight: '#eeeeee',
  redDark: '#df1e3b',
  redLight: '#e8374b',
  white: '#ffffff',
};

export default {
  brand: colors.blue,
  cta: colors.green,

  white: colors.white,
  black: colors.black,

  // background
  bg: {
    light: colors.greyBlue,
    dark: colors.blueDark,
    secondary: colors.blue,
    primary: colors.blue,
    disabled: colors.greyDark,
  },

  // text
  tx: {
    primary: colors.black,
    secondary: colors.greyDark,
    accent: colors.redLight,
    link: colors.blueLight,
    error: colors.redLight,
    success: colors.green,
  },

  // borders
  bd: {
    primary: colors.greyDark,
    faint: colors.greyBlue,
  },

  // breakpoints
  bp: {
    mobile: '480px',
    tablet: '1024px',
  },
};

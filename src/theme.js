const colors = {
  black: '#18212e',
  blue: '#449bf7',
  blueDark: '#2079d6',
  blueLight: '#20a5ff',
  green: '#13ce66',
  grey: '#777777',
  greyBlue: '#ecf0f9',
  greyDark: '#5e6c82',
  greyLight: '#eeeeee',
  greyLighter: '#fafafa',
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
    light: colors.greyLighter,
    dark: colors.greyDark,
    secondary: colors.blue,
    primary: colors.blue,
    disabled: colors.greyDark,
  },

  // text
  tx: {
    primary: colors.black,
    secondary: colors.greyDark,
    accent: colors.blueDark,
    link: colors.blueDark,
    error: colors.redLight,
    success: colors.green,
  },

  // borders
  bd: {
    primary: '1px solid rgba(0, 0, 0, 0.08)',
  },

  // breakpoints
  bp: {
    mobile: '460px',
    tablet: '720px',
  },
};

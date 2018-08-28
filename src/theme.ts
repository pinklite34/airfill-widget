const colors = {
  black: '#18212e',
  blue: '#449bf7',
  blueDark: '#084a96',
  blueLight: '#20a5ff',
  green: '#13ce66',
  grey: '#777777',
  greyBlue: '#ecf0f9',
  greyBorder: '#b7c0cc',
  greyDark: '#5e6c82',
  greyLight: '#eeeeee',
  redDark: '#df1e3b',
  redLight: '#ff4759',
  white: '#ffffff',
};

export default {
  colors,
  brand: colors.blue,
  cta: colors.green,
  white: colors.white,
  black: colors.black,

  // background
  bg: {
    light: colors.greyBlue,
    dark: colors.blueDark,
    secondary: colors.blue,
    primary: colors.green,
    disabled: colors.greyDark,
    red: colors.redLight,
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
    input: `2px solid ${colors.greyBlue}`,
    inputActive: `2px solid ${colors.greyDark}`,
    step: `1px solid ${colors.greyBlue}`,
    divider: `2px solid ${colors.greyBlue}`,
    box: `1px solid ${colors.greyBorder}`,
    boxActive: `1px solid ${colors.green}`,
  },

  // breakpoints
  bp: {
    mobile: '480px',
    tablet: '960px',
  },
};

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
  greyLighter: '#fafafa',
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
    light: colors.greyLighter,
    dark: colors.greyDark,
    secondary: colors.blue,
    primary: colors.blue,
    disabled: colors.greyDark,
    red: colors.redLight,
  },

  // text
  tx: {
    primary: colors.black,
    secondary: colors.greyDark,
    accent: colors.blueDark,
    link: colors.blueLight,
    error: colors.redLight,
    success: colors.green,
  },

  // borders
  bd: {
    primary: '1px solid rgba(0, 0, 0, 0.08)',
    dotted: '2px dotted rgba(0, 0, 0, 0.08)',
    input: `2px solid ${colors.greyBlue}`,
    inputActive: `2px solid ${colors.greyDark}`,
    step: `1px solid ${colors.greyBlue}`,
    divider: `2px solid ${colors.greyBlue}`,
    box: `1px solid ${colors.greyBorder}`,
    boxActive: `1px solid ${colors.green}`,
  },

  // breakpoints
  bp: {
    mobile: '460px',
    tablet: '770px', // raised this to 770px because iPads according to chrome dev tools is 768 px
  },
};

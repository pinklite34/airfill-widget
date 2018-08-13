import * as Color from 'color';

export function colorToString(color) {
  return Color(color)
    .hsl()
    .string();
}

export function colorDarken(color, amount) {
  return colorToString(Color(color).darken(amount));
}

export function colorLighten(color, amount) {
  return colorToString(Color(color).lighten(amount));
}

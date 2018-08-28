import * as React from 'react';
import { css } from 'react-emotion';

const style = css`
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
  color: #444;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  max-width: 736px;

  & a {
    -webkit-text-decoration-skip: objects;
  }

  /**
   * Remove the outline on focused links when they are also active or hovered
   * in all browsers (opinionated).
   */
  & a:active,
  & a:hover {
    outline-width: 0px;
  }

  /**
   * Add the correct font size in all browsers.
   */
  & small {
    font-size: 80%;
  }

  /**
   * Remove the border on images inside links in IE 10-.
   */
  & img {
    border-style: none;
  }

  /**
   * 1. Prevent a WebKit bug where (2) destroys native audio and video
   *    controls in Android 4.
   * 2. Correct the inability to style clickable types in iOS and Safari.
   */
  button,
  html & [type='button'],
  [type='reset'],
  [type='submit'] {
    webkit-appearance: button;
  }
`;

interface RootProps {
  className: string;
  children: any;
}

export default function Root({ children, className }: RootProps) {
  return <div className={`${className} ${style}`}>{children}</div>;
}

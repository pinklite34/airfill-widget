import React from 'react';
import { css } from 'glamor';

const style = css({
  fontSize: 14,
  fontFamily:
    '"Museo Sans Rounded", -apple-system, ".SFNSText-Regular", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif !important',
  color: '#444',
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  maxWidth: 736,

  '& a': {
    '-webkit-text-decoration-skip': 'objects'
  },
  /**
   * Remove the outline on focused links when they are also active or hovered
   * in all browsers (opinionated).
   */

  '& a:active, & a:hover': {
    outlineWidth: 0
  },
  /**
   * Add the correct font size in all browsers.
   */
  '& small': {
    fontSize: '80%'
  },
  /**
   * Remove the border on images inside links in IE 10-.
   */
  '& img': {
    borderStyle: 'none'
  },

  /**
   * 1. Prevent a WebKit bug where (2) destroys native audio and video
   *    controls in Android 4.
   * 2. Correct the inability to style clickable types in iOS and Safari.
   */

  'button, html & [type="button"], [type="reset"], [type="submit"]': {
    WebkitAppearance: 'button'
  }
});

export default ({ children, className }) => (
  <div className={className} {...style}>
    {children}
  </div>
);

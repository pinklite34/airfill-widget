import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

css.insert(
  "@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');"
);

const style = css({
  fontSize: 14,
  fontFamily: '"Roboto", sans-serif !important',
  color: '#444',
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  maxWidth: 736,

  '& a': {
    '-webkit-text-decoration-skip': 'objects',
  },
  /**
   * Remove the outline on focused links when they are also active or hovered
   * in all browsers (opinionated).
   */

  '& a:active, & a:hover': {
    outlineWidth: 0,
  },
  /**
   * Add the correct font size in all browsers.
   */
  '& small': {
    fontSize: '80%',
  },
  /**
   * Remove the border on images inside links in IE 10-.
   */
  '& img': {
    borderStyle: 'none',
  },

  /**
   * 1. Prevent a WebKit bug where (2) destroys native audio and video
   *    controls in Android 4.
   * 2. Correct the inability to style clickable types in iOS and Safari.
   */

  'button, html & [type="button"], [type="reset"], [type="submit"]': {
    WebkitAppearance: 'button',
  },
});

export default function Root({ children, className }) {
  return (
    <div className={className} {...style}>
      {children}
    </div>
  );
}

Root.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

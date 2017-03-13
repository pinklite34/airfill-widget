import styled from 'styled-components';

export default styled.div`
  a {
    -webkit-text-decoration-skip: objects;
  }

  /**
   * Remove the outline on focused links when they are also active or hovered
   * in all browsers (opinionated).
   */

  a:active,
  a:hover {
    outline-width: 0;
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Remove the border on images inside links in IE 10-.
   */

  img {
    border-style: none;
  }


  /**
   * 1. Prevent a WebKit bug where (2) destroys native audio and video
   *    controls in Android 4.
   * 2. Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  html & [type="button"], /* 1 */
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button; /* 2 */
  }


  font-size: 14px;
  font-family: -apple-system, ".SFNSText-Regular", "Helvetica Neue",
    "Roboto", "Segoe UI", sans-serif !important;
  color: #333;
  box-sizing: border-box;
  padding: 0;
  margin: 0;


  * {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 16px 0;

    &:first-child {
      margin-top: 0;
    }
  }
  h3 {
    margin: 8px 0;
  }

  p {
    margin-top: 0;
    font-size: 14px;
    line-height: 1.5;
  }
  input + p {
    margin-top: 1em;
  }


  var {
    font-style: normal;
  }
  pre {
    margin-top: 0;
    padding: 8px;
    background-color: rgba(0,0,0,0.08);
  }

  input[type="tel"],
  input[type="text"],
  input[type="password"],
  input[type="number"],
  input[type="email"],
  select {
    min-height: 40px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 14px;
    font-family: inherit;

    &:hover {
      border-color: #bbb;
    }
    &:active,
    &:focus {
      border-color: #999;
    }
  }

  .refill-introduction, .refill-terms {
    font-size: 12px;
    text-align: center;
    padding: 16px;
    margin: 0;
    color: #777;

    a {
      color: inherit;
    }

    & + & {
      padding-top: 0;
    }
  }
`

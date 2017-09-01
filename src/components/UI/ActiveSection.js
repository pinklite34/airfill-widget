import React from 'react';
import { css } from 'glamor';

const container = css({
  backgroundColor: '#FAFAFA',
  padding: 16
})

const ActiveSection = ({ children }) =>
  <div {...container}>
    {children}
  </div>;

  export default ActiveSection;

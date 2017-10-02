import React from 'react';
import Spinner from './Spinner';

const SpinnerWhileLoading = ({ hasLoaded, children }) =>
  hasLoaded ? <div>{children}</div> : <Spinner />;

export default SpinnerWhileLoading;

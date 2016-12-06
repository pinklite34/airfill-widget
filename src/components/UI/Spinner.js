import React from 'react';
import './Spinner.scss';

export default ({
  children,
  hideText = false,
  inverted = false,
  className = ''
}) => (
  <div className={`spinner-wrapper spinner-wrapper-ios ${className}`} key="spinner">
    <div className={
      `spinner spinner-ios ${inverted ? 'spinner-white' :''}`
    }>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
    {!hideText &&
      <div className="spinner-text">{children || 'Loading...'}</div>
    }
  </div>
);

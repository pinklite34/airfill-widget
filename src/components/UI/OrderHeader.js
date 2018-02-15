import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = {
  base: css({
    backgroundColor: '#fafafa',
    display: 'flex',
    overflow: 'hidden',
    padding: 16,
  }),
  icon: css({
    maxWidth: 32,
    maxHeight: 32,
    marginRight: '24px',
    marginTop: '12px',
    marginLeft: '12px',
  }),
  text: css({
    margin: 0,
    flex: 1,
  }),
  label: css({
    float: 'left',
    margin: 0,
    padding: 0,
  }),
  orderId: css({
    float: 'right',
    marginRight: '12px',
    lineHeight: '31.5px',
    color: '#777777',
    fontSize: '12px',
  }),
  details: css({
    color: '#777777',
    fontSize: '14px',
  }),
};

const OrderHeader = ({ children, order, title, subtitle, icon }) => (
  <div {...styles.base}>
    <div {...styles.icon}>{icon}</div>
    <div {...styles.text}>
      <h2 {...styles.label}>{title}</h2>
      <div {...styles.orderId}>Order {order.id}</div>
      <br />
      <br />
      <div {...styles.details}>{subtitle}</div>
    </div>
  </div>
);

OrderHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

export default OrderHeader;

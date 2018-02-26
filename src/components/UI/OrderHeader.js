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
    marginRight: '26px',
    marginTop: '8px',
    marginLeft: '10px',
    '@media(max-width: 460px)': {
      marginLeft: 0,
      marginRight: '14px',
    },
  }),
  text: css({
    margin: 0,
    flex: 1,
  }),
  label: css({
    fontSize: '18px',
    fontWeight: '500',
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
    '@media(max-width: 460px)': {
      float: 'left',
      width: '100%',
    },
  }),
  subtitle: css({
    color: '#777777',
    fontSize: '14px',
    float: 'left',
    marginTop: '28px',
  }),
};

const OrderHeader = ({ children, order, title, subtitle, icon }) => (
  <div {...styles.base}>
    <div {...styles.icon}>{icon}</div>
    <div {...styles.text}>
      <div {...styles.label}>{title}</div>
      <div {...styles.orderId}>Order {order.id}</div>
      <div {...styles.subtitle}>{subtitle}</div>
    </div>
  </div>
);

OrderHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

export default OrderHeader;

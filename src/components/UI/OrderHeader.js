import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Tooltip from 'material-ui/Tooltip';
import setClipboardText from '../../lib/clipboard-helper';
import { orderProp } from '../../lib/prop-types';

const styles = {
  base: css({
    backgroundColor: '#fafafa',
    display: 'flex',
    overflow: 'hidden',
    padding: 16,
  }),
  icon: css({
    width: 32,
    height: 32,
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
    flexDirection: 'column',
  }),
  textHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  }),
  label: css({
    margin: 0,
    padding: 0,
    fontSize: '18px',
    fontWeight: '500',
  }),
  orderId: css({
    marginRight: '12px',
    lineHeight: '31.5px',
    color: '#777777',
    fontSize: '12px',
    '@media(max-width: 460px)': {
      width: '100%',
    },
  }),
  subtitle: css({
    color: '#777777',
    fontSize: '14px',
  }),
};

class OrderHeader extends PureComponent {
  state = {
    open: false,
  };

  copy = () => {
    this.setState({ open: true });
    setTimeout(() => this.setState({ open: false }), 2000);

    setClipboardText(this.props.order.id);
  };

  render() {
    const { order, title, subtitle, icon } = this.props;

    return (
      <div {...styles.base}>
        <div {...styles.icon}>{icon}</div>
        <div {...styles.text}>
          <div {...styles.textHeader}>
            <div {...styles.label}>{title}</div>
            <Tooltip open={this.state.open} title="Copied!">
              <div {...styles.orderId} onClick={this.copy}>
                Order ID {order.id}
              </div>
            </Tooltip>
          </div>
          <div {...styles.subtitle}>{subtitle}</div>
        </div>
      </div>
    );
  }
}

OrderHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  icon: PropTypes.node,
  order: orderProp,
};

export default OrderHeader;

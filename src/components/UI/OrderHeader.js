import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import Tooltip from 'material-ui/Tooltip';
import setClipboardText from '../../lib/clipboard-helper';
import { orderProp } from '../../lib/prop-types';

const styles = {
  base: css`
    background-color: #fafafa;
    display: flex;
    overflow: hidden;
    padding: 16px;
  `,
  icon: css`
    width: 32px;
    height: 32px;
    margin-right: 26px;
    margin-top: 8px;
    margin-left: 10px;

    @media (max-width: 460px) {
      margin-left: 0px;
      margin-right: 14px;
    }
  `,
  text: css`
    margin: 0px;
    flex: 1;
    flex-direction: column;
  `,
  textHeader: css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  `,
  label: css`
    margin: 0px;
    padding: 0px;
    font-size: 18px;
    font-weight: 500;
  `,
  orderId: css`
    margin-right: 12px;
    line-height: 31.5px;
    color: #777777;
    font-size: 12px;

    @media (max-width: 460px) {
      width: 100%;
    }
  `,
  subtitle: css`
    color: #777777;
    font-size: 14px;
  `,
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
      <div className={styles.base}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.text}>
          <div className={styles.textHeader}>
            <div className={styles.label}>{title}</div>
            <Tooltip open={this.state.open} title="Copied!">
              <div className={styles.orderId} onClick={this.copy}>
                Order ID {order.id}
              </div>
            </Tooltip>
          </div>
          <div className={styles.subtitle}>{subtitle}</div>
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

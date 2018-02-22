import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { css } from 'glamor';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
};

const muiStyles = {
  selectedItem: {
    backgroundColor: '#f8f8f8 !important',
  },
  item: {
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
  },
  primaryText: {
    fontWeight: 'bold',
  },
};

const styles = {
  divider: css({
    border: 0,
    height: 0,
    borderTop: '1px solid #f0f0f0',
    margin: 0,
  }),
  icon: css({
    flex: '0 0 48px',
    textAlign: 'center',
    marginLeft: '-12px',
  }),
  content: css({
    flex: 'auto',
  }),
};

const Divider = () => <hr {...styles.divider} />;

const Item = props => {
  let {
    title,
    description,
    open,
    onClick,
    classes,
    icon,
    order,
    billingCurrency,
    accountBalance,
    requireAccountBalance,
    selected,
    noIcons,
    paymentMode,
  } = props;

  if (typeof icon === 'string') {
    icon = <img src={icon} />;
  }

  const price = order[valueField[billingCurrency.toLowerCase()]];
  const canAfford = price <= accountBalance;
  const widgetRequireAccountBalance = requireAccountBalance;

  // decide if the current payment method is a direct coin payment
  const isDirect = ['bitcoin', 'litecoin', 'lightning', 'dash'].some(
    v => paymentMode === v
  );

  const disabled =
    !isDirect &&
    (!canAfford &&
      ((widgetRequireAccountBalance && requireAccountBalance !== false) ||
        requireAccountBalance));

  const className = noIcons ? styles.icon : {};

  return (
    <MenuItem
      className={classNames(classes.item, { [classes.selectedItem]: selected })}
      open={open}
      onClick={() => onClick(props)}
      disabled={disabled}
    >
      <div {...className}>{icon}</div>

      <div {...styles.content}>
        <ListItemText
          classes={{
            primary: classes.primaryText,
          }}
          primary={title}
          secondary={description}
        />
      </div>
    </MenuItem>
  );
};

class PaymentMenu extends React.Component {
  state = {
    selectedIndex: 0,
  };

  onClick = (data, index) => {
    this.setState({ selectedIndex: index });
    this.props.onClick(data);
  };

  render() {
    const { open, anchorEl, paymentButtons, onClose } = this.props;
    const { selectedIndex } = this.state;

    const noIcons = paymentButtons && paymentButtons.some(btn => !!btn.icon);

    return (
      <Menu anchorEl={anchorEl} open={open} onClose={() => onClose()}>
        {paymentButtons &&
          paymentButtons.map((options, index) => (
            <React.Fragment key={index}>
              <Item
                {...options}
                {...this.props}
                noIcons={noIcons}
                onClick={data => this.onClick(data, index)}
                selected={selectedIndex === index}
              />
              {index < paymentButtons.length - 1 && <Divider />}
            </React.Fragment>
          ))}
      </Menu>
    );
  }
}

export default withStyles(muiStyles)(PaymentMenu);

import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';
import { css } from 'glamor';
import { withStyles } from 'material-ui/styles';

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
};

const muiStyles = {
  menu: {
    backgroundColor: '#f8f8f8 !important',
  },
};

const styles = {
  divider: css({
    border: 0,
    height: 0,
    borderTop: '1px solid #f0f0f0',
    margin: 0,
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
  } = props;

  if (typeof icon === 'string') {
    icon = <img src={icon} />;
  }

  const price = order[valueField[billingCurrency.toLowerCase()]];
  const canAfford = price <= accountBalance;
  const widgetRequireAccountBalance = requireAccountBalance;

  const disabled =
    !canAfford &&
    ((widgetRequireAccountBalance && requireAccountBalance !== false) ||
      requireAccountBalance);

  return (
    <MenuItem
      className={selected ? classes.menu : ''}
      open={open}
      onClick={() => onClick(props)}
      disabled={disabled}
    >
      {icon && <ListItemIcon style={{ margin: 0 }}>{icon}</ListItemIcon>}
      <ListItemText primary={title} secondary={description} />
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

    return (
      <Menu anchorEl={anchorEl} open={open} onClose={() => onClose()}>
        {paymentButtons &&
          paymentButtons.map((options, index) => (
            <React.Fragment key={index}>
              <Item
                {...options}
                {...this.props}
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

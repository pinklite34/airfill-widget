import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { css } from 'glamor';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { canAfford } from '../../lib/currency-helpers';

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
    fontWeight: '500',
    fontFamily: '"Roboto", sans-serif',
  },
  menu: {
    width: '348px',
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
    selected,
    noIcons,
  } = props;

  if (typeof icon === 'string') {
    icon = <img src={icon} />;
  }

  const disabled = !canAfford(props);
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
    const { open, anchorEl, paymentButtons, onClose, classes } = this.props;
    const { selectedIndex } = this.state;

    const noIcons = paymentButtons && paymentButtons.some(btn => !!btn.icon);

    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => onClose()}
        classes={{
          paper: classes.menu,
        }}
      >
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

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { css } from 'glamor';
import { withStyles } from 'material-ui/styles';

import { canAfford } from '../../lib/currency-helpers';
import {
  elementProp,
  paymentsProp,
  affordProps,
  paymentProps,
  fnProp,
} from '../../lib/prop-types';

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
    width: '396px',
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
  imageIcon: css({
    maxWidth: '32px',
    maxHeight: '32px',
  }),
};

function Divider() {
  return <hr {...styles.divider} />;
}

const ImageIcon = ({ src }) => <img {...styles.imageIcon} src={src} />;

ImageIcon.propTypes = {
  src: PropTypes.string.isRequired,
};

function Item(props) {
  let {
    title,
    description,
    open,
    onClick,
    classes,
    icon,
    selected,
    noIcons,
    affordProps,
    requireAccountBalance,
    paymentMode,
  } = props;

  if (typeof icon === 'string') {
    icon = <ImageIcon src={icon} />;
  }

  const disabled = !canAfford({
    ...affordProps,
    requireAccountBalance,
    paymentMode,
  });
  const className = noIcons ? styles.icon : {};

  if (typeof description === 'function') {
    description = description(!disabled);

    if (typeof description !== 'string') {
      throw new Error('description function must return a string');
    }
  }

  return (
    <MenuItem
      className={`${classes.item} ${selected && classes.selectedItem}`}
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
}

Item.propTypes = {
  open: PropTypes.bool,
  onClick: fnProp,
  classes: PropTypes.object,
  selected: PropTypes.bool,
  noIcons: PropTypes.bool,
  affordProps: affordProps,
  ...paymentProps,
};

class PaymentMenu extends PureComponent {
  static propTypes = {
    onClick: fnProp,
    open: PropTypes.bool,
    anchorEl: elementProp,
    paymentButtons: paymentsProp,
    onClose: fnProp,
    classes: PropTypes.object,
    affordProps: affordProps,
  };
  state = {
    selectedIndex: 0,
  };

  onClick = index => data => {
    this.setState({ selectedIndex: index });
    this.props.onClick(data);
  };

  render() {
    const {
      open,
      anchorEl,
      paymentButtons,
      onClose,
      classes,
      affordProps,
    } = this.props;

    const { selectedIndex } = this.state;

    const noIcons = paymentButtons && paymentButtons.some(btn => !!btn.icon);

    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.menu,
        }}
      >
        {paymentButtons &&
          paymentButtons.map((paymentButton, index) => (
            <Fragment key={index}>
              <Item
                {...this.props}
                {...paymentButton}
                affordProps={affordProps}
                noIcons={noIcons}
                onClick={this.onClick(index)}
                selected={selectedIndex === index}
              />
              {index < paymentButtons.length - 1 && <Divider />}
            </Fragment>
          ))}
      </Menu>
    );
  }
}

export default withStyles(muiStyles)(PaymentMenu);

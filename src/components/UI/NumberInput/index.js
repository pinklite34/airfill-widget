import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import InputRow from './InputRow';

import { selectCountry } from '../../../store';

import items from '../../../countries.json';
import flags from '../flags';

const Container = styled('div')`
  position: relative;
`;

const DropdownContainer = styled('div')`
  position: absolute;
  max-height: 248px;
  width: 240px;
  overflow-y: scroll;

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  @media (min-width: ${p => p.theme.bp.mobile}) {
    right: 0;
  }
`;

const ItemContainer = styled('div')`
  padding: 12px;
  background-color: ${props =>
    props.active ? props.theme.bg.light : props.theme.white};
  cursor: pointer;

  display: flex;
  flex-direction: row;
`;

const Flag = styled('img')`
  margin-right: 8px;
`;

function MenuItem({ country, ...props }) {
  if (!country) {
    return null;
  }
  const flag = flags[country.alpha2];
  return (
    <ItemContainer {...props}>
      <Flag src={flag} />
      <span style={{ marginTop: 'auto' }}>{country.name}</span>
    </ItemContainer>
  );
}

MenuItem.propTypes = {
  country: PropTypes.any,
};

class ChangeCountry extends Component {
  static propTypes = {
    country: PropTypes.any,
  };

  state = {
    open: false,
  };

  toggle = () =>
    this.setState(prevState => ({
      open: !prevState.open,
    }));

  render() {
    const { open, country } = this.state;

    return (
      <Downshift
        onFocusLost={() => console.log('lost focus')}
        onChange={() => console.log('on change')}
        itemToString={item => (item ? item.name : '')}
        isOpen={open}
        onStateChange={changes => {
          if (changes.isOpen === false) {
            this.setState({ open: false });
          }
        }}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getRootProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <Container>
              <InputRow
                {...getLabelProps({
                  onClick: this.toggle,
                  onChange: e => console.log('onchange', e),
                  country,
                  loading: false,
                  submitEnabled: true,
                  onSubmit: e => console.log('onsubmit', e),
                })}
              />
              {isOpen && (
                <DropdownContainer>
                  {items.map((item, index) => (
                    <MenuItem
                      {...getItemProps({
                        index,
                        item,
                        active: highlightedIndex === index,
                      })}
                      key={item.name}
                      country={item}
                    />
                  ))}
                </DropdownContainer>
              )}
            </Container>
          </div>
        )}
      </Downshift>
    );
  }
}

export default connect(state => ({
  country: selectCountry(state),
}))(ChangeCountry);

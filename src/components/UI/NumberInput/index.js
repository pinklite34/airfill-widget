import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { AsYouType } from 'libphonenumber-js';

import InputRow from './InputRow';

import { selectCountry, selectNumber } from '../../../store';
import { setCountry, setNumber } from '../../../actions';

import items from '../../../countries.json';
import flags from '../flags';

const Container = styled('div')`
  position: relative;
`;

const DropdownContainer = styled('div')`
  position: absolute;
  max-height: 248px;
  overflow-y: scroll;

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

const ItemContainer = styled('div')`
  padding: 12px;
  background-color: ${props => (props.active ? 'gray' : 'white')};
  color: black;
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
    number: PropTypes.string,
    setCountry: PropTypes.func.isRequired,
    setNumber: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    value: '',
  };

  componentDidMount() {
    this.onType(this.props.number || '');
  }

  onType = e => {
    const number = e;

    const asYouType = new AsYouType();
    const input = asYouType.input(number);
    console.log(input);

    if (input && asYouType.country) {
      this.props.setCountry(asYouType.country);
      this.props.setNumber(input);
      this.setState({
        open: false,
      });
    } else {
      const match = items.find(
        ({ name }) => name.toLowerCase() === number.toLowerCase()
      );

      this.props.setCountry(match ? match.alpha2 : null);
      this.setState({ open: !match });
    }

    this.setState({
      value: input || number,
    });
  };

  onChange = item => {
    this.setState({
      value: item.name,
    });
    this.props.setNumber('');
    this.props.setCountry(item.alpha2);
  };

  setOpen = open => this.setState({ open });
  toggle = () => this.setOpen(!this.state.open);

  render() {
    const { open, value } = this.state;

    const rows = items.filter(({ name }) => {
      const display = name.toLowerCase();
      const input = value.toLowerCase();

      return display.indexOf(input) > -1;
    });

    return (
      <Downshift
        onFocusLost={() => console.log('lost focus')}
        onChange={this.onChange}
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
                  onChange: e => this.onType(e),
                  loading: false,
                  submitEnabled: !!this.props.country,
                  onSubmit: e => console.log('onsubmit', e),
                  setOpen: this.setOpen,
                  value: this.state.value,
                })}
              />
              {isOpen && (
                <DropdownContainer>
                  {rows.map((item, index) => (
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

export default connect(
  state => ({
    number: selectNumber(state),
    country: selectCountry(state),
  }),
  {
    setCountry,
    setNumber,
  }
)(ChangeCountry);

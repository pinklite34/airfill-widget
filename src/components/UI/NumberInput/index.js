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
  background-color: #fff;

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

const ItemContainer = styled('div')`
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background-color: ${props =>
    props.active ? 'rgba(0, 0, 0, 0.08)' : 'white'};
  color: black;
  cursor: pointer;
  margin-top: -4px;

  display: flex;
  align-items: stretch;
`;

const FlagContainer = styled('div')`
  background: rgba(0, 0, 0, 0.04);
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px 0;
`;

const Content = styled('div')`
  margin-left: 6px;
  font-size: 16px;
  padding: 12px;
`;

function MenuItem({ country, ...props }) {
  if (!country) {
    return null;
  }
  const flag = flags[country.alpha2];
  return (
    <ItemContainer {...props}>
      <FlagContainer>
        <img src={flag} />
      </FlagContainer>
      <Content>
        <span style={{ marginTop: 'auto' }}>{country.name}</span>
      </Content>
    </ItemContainer>
  );
}

MenuItem.propTypes = {
  country: PropTypes.any,
};

class ChangeCountry extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    country: PropTypes.any,
    number: PropTypes.string,
    setCountry: PropTypes.func.isRequired,
    setNumber: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
      this.setState({ open: !match && e !== '' });
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
    const { onSubmit, isLoading } = this.props;
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
                  onChange: e => this.onType(e),
                  loading: isLoading,
                  submitEnabled: !!this.props.country,
                  onSubmit: onSubmit,
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

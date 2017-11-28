import React, { Component } from 'react';
import Downshift from 'downshift';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setCountry, resetNumberLookup } from '../../actions';
import {
  selectCountry,
  selectCountryList,
  selectIsNumberLookup
} from '../../store';

import { Card } from 'react-toolbox/lib/card';
import CollapsedSection from '../UI/CollapsedSection';
import Dropdown from '../UI/ComboInput/Dropdown';
import Flag from '../UI/Flag';

const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    maxWidth: 350
  }),
  openContainer: css({
    margin: -12
  }),
  country: css({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 9
  }),
  openCountry: css({
    padding: 12,
    alignItems: 'stretch',
    zIndex: 11
  }),
  row: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  }),
  flag: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: 24,
      height: 18,
      borderRadius: 1,
      boxShadow: '1px 1px 1px rgba(0,0,0,0.08)'
    },
    marginRight: 12
  }),
  input: css({
    flex: '1 0 auto',
    background: 'none',
    fontSize: 16,
    border: 0,
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      color: 'rgba(0,0,0,.26)'
    }
  }),
  countryName: css({
    fontWeight: 500
  })
};

class Collapsed extends Component {
  state = {
    inputValue: ''
  };

  handleInputChange = inputValue => this.setState({ inputValue });

  setInputRef = ref => (this.input = ref);

  render() {
    const {
      home,
      goHome,
      country,
      countryList,
      darken,
      history,
      setCountry,
      isNumberLookup
    } = this.props;

    if (isNumberLookup) {
      return null;
    }

    const { inputValue } = this.state;

    if (!country) {
      return (
        <CollapsedSection hideButton darken={darken} type="country">
          Select a country above to see available providers.
        </CollapsedSection>
      );
    }

    const normalizedInputValue = inputValue.toLowerCase();
    const items = countryList
      .filter(
        country =>
          country.name.toLowerCase().indexOf(normalizedInputValue) !== -1
      )
      .map((item, index) => ({ ...item, __type: 'country', index }));

    return (
      <Downshift
        onChange={item => {
          setCountry(item.alpha2);
          this.handleInputChange('');
          !home && history.push('/refill/selectProvider');
        }}
        selectedItem={country}
        inputValue={inputValue}
        itemToString={country => country && country.name}
        itemCount={items.length}
      >
        {({
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          openMenu
        }) => (
          <div>
            <CollapsedSection
              darken={darken}
              onClick={home ? openMenu : goHome}
              type="country"
            >
              {isOpen ? (
                <div {...css([styles.container, styles.openContainer])}>
                  <Card
                    {...css([styles.country, styles.openCountry])}
                    onClick={home ? openMenu : goHome}
                  >
                    <div {...styles.row}>
                      <div {...styles.flag}>
                        <Flag />
                      </div>
                      <input
                        {...getInputProps({
                          onChange: e => this.handleInputChange(e.target.value),
                          placeholder: 'Enter country name',
                          autoFocus: true
                        })}
                        {...css([styles.input])}
                      />
                    </div>
                  </Card>
                  <Dropdown
                    getItemProps={getItemProps}
                    items={items}
                    highlightedIndex={highlightedIndex}
                  />
                </div>
              ) : (
                <div {...styles.container}>
                  <div {...styles.country} onClick={openMenu}>
                    <div {...styles.flag}>
                      <Flag country={country.alpha2} />
                    </div>
                    <div {...styles.countryName}>{country.name}</div>
                  </div>
                </div>
              )}
            </CollapsedSection>
          </div>
        )}
      </Downshift>
    );
  }
}

export default connect(
  state => ({
    country: selectCountry(state),
    countryList: selectCountryList(state),
    isNumberLookup: selectIsNumberLookup(state)
  }),
  dispatch => ({
    setCountry: country => dispatch(setCountry(country)),
    goHome: () => dispatch(resetNumberLookup()) && dispatch(push('/refill'))
  })
)(Collapsed);

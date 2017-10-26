import React, { Component } from 'react';
import Downshift from 'downshift';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { setCountry } from '../../actions';
import { selectCountryCode, selectCountryList } from '../../store';

import { Card } from 'react-toolbox/lib/card';
import CollapsedSection from '../UI/CollapsedSection';
import Dropdown from '../UI/ComboInput/Dropdown';
import flags from '../flags';
import NoFlag from '../UI/ComboInput/flag.svg';

const styles = {
  container: css({
    position: 'relative',
    width: 350
  }),
  openContainer: css({
    margin: -12
  }),
  country: css({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 10
  }),
  openCountry: css({
    padding: 12,
    alignItems: 'stretch'
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
      countryCode,
      countryList,
      prefix,
      darken,
      history,
      setCountry
    } = this.props;

    const { inputValue } = this.state;

    if (!countryCode) {
      return null;
    }

    const country = countryList.find(country => country.alpha2 === countryCode);

    if (!country) {
      return (
        <CollapsedSection darken={darken} type="country">
          Your country ({countryCode}) is not supported in Bitrefill.
        </CollapsedSection>
      );
    }

    const Flag = flags[country.alpha2.toLowerCase()];
    const items = countryList.filter(
      country =>
        country.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );

    return (
      <Downshift
        onChange={item => {
          setCountry(item.alpha2);
          this.handleInputChange('');
          !home && history.push('/selectProvider');
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
            <CollapsedSection darken={darken} onClick={openMenu} type="country">
              {isOpen ? (
                <div {...css([styles.container, styles.openContainer])}>
                  <Card
                    {...css([styles.country, styles.openCountry])}
                    onClick={openMenu}
                  >
                    <div {...styles.row}>
                      <div {...styles.flag}>
                        <NoFlag />
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
                    <div {...styles.flag}>{Flag && <Flag />}</div>
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
    countryCode: selectCountryCode(state),
    countryList: selectCountryList(state)
  }),
  {
    setCountry
  }
)(Collapsed);

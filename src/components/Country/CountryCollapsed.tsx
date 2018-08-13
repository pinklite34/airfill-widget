import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { openComboInput, setComboInputFocus, setCountry } from '../../actions';
import { CountryProp } from '../../lib/prop-types';
import { selectCountry, selectIsNumberLookup } from '../../store';
import Collapsed from '../UI/Collapsed';
import Flag from '../UI/Flag';
import Text from '../UI/Text';

interface CountryCollapsedProps {
  home: any;
  country: CountryProp;
  isNumberLookup: boolean;
  openComboInput: typeof openComboInput;
  setComboInputFocus: typeof setComboInputFocus;
  setCountry: typeof setCountry;
  history: History;
}

function CountryCollapsed({
  home,
  country,
  isNumberLookup,
  openComboInput,
  setComboInputFocus,
  setCountry,
  history,
}: CountryCollapsedProps) {
  const openMenu = () => {
    setCountry('');
    openComboInput();
    setComboInputFocus(true);
    !home && history.push('/refill');
  };

  return country && country.alpha2 ? (
    <Collapsed
      onClick={openMenu}
      type="country"
      icon={<Flag country={country.alpha2} width="40px" height="30px" />}
      title={country.name}
    />
  ) : (
    <Collapsed
      hideButton
      type="country"
      alt="Select a country above to see available services."
      title={
        <Text type="p" tight size="16px" id="introduction.select">
          Select a country above to see available services.
        </Text>
      }
    />
  );
}

export default connect(
  state => ({
    country: selectCountry(state),
    isNumberLookup: selectIsNumberLookup(state),
  }),
  {
    openComboInput,
    setComboInputFocus,
    setCountry,
  }
)(CountryCollapsed);

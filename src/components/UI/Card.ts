import PropTypes from 'prop-types';
import styled from 'react-emotion';

import CardShadow from './CardShadow';

const Card = styled(CardShadow)`
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.white};
  border-radius: 2px;
`;

Card.propTypes = {
  noBorder: PropTypes.bool,
};

Card.displayName = 'Card';

export default Card;

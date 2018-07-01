import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Card = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.white};
  border-radius: 2px;
  box-shadow: ${p =>
    !p.noBorder &&
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};
`;

Card.propTypes = {
  noBorder: PropTypes.bool,
};

export default Card;

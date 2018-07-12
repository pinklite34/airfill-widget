import PropTypes from 'prop-types';
import styled from 'react-emotion';

const CardShadow = styled('div')`
  pointer: ${p => p.onClick && 'cursor'};
  transition: box-shadow 0.3s ease;
  box-shadow: ${p =>
    !p.noBorder &&
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};

  @media (max-width: ${p => p.theme.bp.mobile}) {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    box-shadow: ${p =>
      p.onClick &&
      !p.noBorder &&
      '0px 4px 20px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};
  }
`;

CardShadow.propTypes = {
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CardShadow;

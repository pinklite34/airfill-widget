import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Flex = styled('div')`
  display: flex;
  flex-direction: ${p => p.direction || (p.row ? 'row' : 'column')};
  flex-wrap: ${p => p.wrap};

  align-items: ${p =>
    p.alignItems || (p.centered ? 'center' : 'space-between')};
  justify-content: ${p =>
    p.justifyContent || (p.centered ? 'center' : 'space-between')};
  text-align: ${p => (p.centered ? 'center' : 'left')};

  padding: ${p => p.padding};
  margin: ${p => p.margin};
`;

Flex.propTypes = {
  centered: PropTypes.bool,
  row: PropTypes.bool,
  wrap: PropTypes.oneOf([
    'nowrap',
    'wrap',
    'wrap-reverse',
    'inherit',
    'initial',
    'unset',
  ]),
  padding: PropTypes.string,
  margin: PropTypes.string,
  direction: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  alignItems: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'stretch',
  ]),
  justifyContent: PropTypes.oneOf([
    'center',
    'start',
    'end',
    'flex-start',
    'flex-end',
    'left',
    'right',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
  ]),
};

Flex.defaultProps = {
  wrap: 'nowrap',
  padding: '0',
  margin: '0',
};

export default Flex;

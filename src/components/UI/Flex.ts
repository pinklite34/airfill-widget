import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

const Flex = styled('div')`
  display: flex;
  flex-direction: ${(p: any) => p.direction || (p.row ? 'row' : 'column')};
  flex-wrap: ${(p: any) => p.wrap};

  align-items: ${(p: any) =>
    p.alignItems || (p.centered ? 'center' : 'space-between')};
  justify-content: ${(p: any) =>
    p.justifyContent || (p.centered ? 'center' : 'space-between')};
  text-align: ${(p: any) => (p.centered ? 'center' : 'left')};

  padding: ${(p: any) => p.padding};
  margin: ${(p: any) => p.margin};
  width: ${(p: any) => p.width};
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
  width: PropTypes.string,
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

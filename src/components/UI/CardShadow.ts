import styled from 'react-emotion';
import theme from 'theme';

interface CardShadowProp {
  onClick?: () => void;
  noBorder?: boolean;
  alwaysBorder?: boolean;
  theme: typeof theme;
}

const CardShadow = styled('div')`
  cursor: ${(p: CardShadowProp) => p.onClick && 'pointer'};
  transition: box-shadow 0.3s ease;
  box-shadow: ${(p: CardShadowProp) =>
    !p.noBorder &&
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};

  @media (max-width: ${(p: CardShadowProp) => p.theme.bp.mobile}) {
    box-shadow: ${(p: CardShadowProp) => (p.alwaysBorder ? null : 'none')};
  }

  &:hover,
  &:focus {
    box-shadow: ${(p: CardShadowProp) =>
      p.onClick &&
      !p.noBorder &&
      '0px 4px 20px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};
  }
`;

export default CardShadow;

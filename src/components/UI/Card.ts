import styled from 'react-emotion';

import CardShadow from './CardShadow';

const Card = styled(CardShadow)`
  display: flex;
  flex-direction: column;
  background-color: ${(p: any) => p.theme.white};
  border-radius: 2px;
`;

Card.displayName = 'Card';

export default Card;

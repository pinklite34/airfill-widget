import { REHYDRATE } from 'redux-persist/constants';

export const selectRecentNumbers = state =>
  state.airfillWidget && state.airfillWidget.recentNumbers;

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'LOAD_ORDER_SUCCESS':
      const { number } = payload;
      // Make sure number starts with +
      const formattedNumber = number.indexOf('+') === 0 ? number : `+${number}`;
      return state.reduce(
        (numbers, cur) => {
          if (
            numbers.length < 5 &&
            !numbers.find(refill => refill.number === cur.number)
          ) {
            numbers.push(cur);
          }

          return numbers;
        },
        [{ number: formattedNumber, operator: payload.operator }]
      );

    case REHYDRATE:
      return [
        ...state,
        ...selectRecentNumbers(payload)
      ];

    default:
      return state;
  }
};

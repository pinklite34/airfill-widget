import { formatNumber } from './number-input-helpers';

describe('formatNumber', () => {
  it('Inserts + for international numbers', () => {
    expect(formatNumber(null, '0', 1)).toMatchObject({
      formattedValue: '+0',
      number: '+0',
      country: undefined,
      caret: 2
    });
  });
  it('Does not insert + for local numbers', () => {
    expect(formatNumber('DE', '0', 1)).toMatchObject({
      formattedValue: '0',
      number: '0',
      country: 'DE',
      caret: 1
    });
  });
});

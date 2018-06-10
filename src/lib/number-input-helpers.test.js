import { formatNumber } from './number-input-helpers';

describe('formatNumber', () => {
  it('Handles null country', () => {
    expect(formatNumber(null, '0', 1)).toMatchObject({
      formattedValue: '0',
      number: '0',
      country: undefined,
      caret: 1,
    });
  });

  it('Handles null number', () => {
    expect(formatNumber({ alpha2: 'DE' }, null, 1)).toBeNull();
  });

  it('Handles null caret', () => {
    expect(formatNumber({ alpha2: 'DE' }, '0', null)).toMatchObject({
      formattedValue: '0',
      number: '0',
      country: 'DE',
      caret: 0,
    });
  });

  it('Handles caret position (no effect)', () => {
    expect(formatNumber({ alpha2: 'GB' }, '07738875900', 4)).toMatchObject({
      formattedValue: '07738 875900',
      number: '07738875900',
      country: 'GB',
      caret: 4,
    });
  });

  it('Handles caret position (with effect)', () => {
    expect(formatNumber({ alpha2: 'GB' }, '07738875900', 7)).toMatchObject({
      formattedValue: '07738 875900',
      number: '07738875900',
      country: 'GB',
      caret: 8,
    });
  });

  it('Handles number with country code', () => {
    expect(formatNumber(null, '+447738875900', 0)).toMatchObject({
      formattedValue: '+44 7738 875900',
      number: '+447738875900',
      country: 'GB',
      caret: 0,
    });
  });

  it('Overrides country when number matches another', () => {
    expect(formatNumber({ alpha2: 'DE' }, '+447738875900', 0)).toMatchObject({
      formattedValue: '+44 7738 875900',
      number: '+447738875900',
      country: 'GB',
      caret: 0,
    });
  });
});

import {
  isPhoneNumber,
  formatNumber,
  formatDefaultValue,
  formatDisplayValue,
  parseNumber,
} from './number-helpers.js'

const SE = {
  alpha2: 'SE',
  countryCallingCodes: ['+46'],
}
const XX = {
  alpha2: 'XX',
  countryCallingCodes: ['+99'],
}

describe('isPhoneNumber', () => {
  it('Treats no type/null as phone', () => {
    expect(isPhoneNumber()).toBe(true)
    expect(isPhoneNumber(null)).toBe(true)
  })
  it('Treats voip as phone', () => {
    expect(isPhoneNumber('VOIP')).toBe(true)
    expect(isPhoneNumber('voip')).toBe(true)
  })
  it('Treats data as phone', () => {
    expect(isPhoneNumber('data')).toBe(true)
    expect(isPhoneNumber('DATA')).toBe(true)
  })
  it('Treats other strings as non-phones', () => {
    expect(isPhoneNumber('DHT')).toBe(false)
    expect(isPhoneNumber('foo')).toBe(false)
    expect(isPhoneNumber('BAR')).toBe(false)
  })
})

describe('formatNumber', () => {
  it('Adds country code of missing', () => {
    expect(formatNumber(null, '763409606', SE)).toBe('+46 76 340 96 06')
    expect(formatNumber('voip', '763409606', SE)).toBe('+46 76 340 96 06')
    expect(formatNumber('dht', '12345', SE)).toBe('+46 12345')
  })

  it('Fails silently for unknown country codes', () => {
    expect(formatNumber(null, '763409606', XX)).toBe('+99 763409606')
    expect(formatNumber('voip', '763409606', XX)).toBe('+99 763409606')
    expect(formatNumber('dht', '12345', XX)).toBe('+99 12345')
  })
})

describe('formatDefaultValue', () => {
  it('Defaults to country code for phone numbers', () => {
    expect(formatDefaultValue(null, '', SE)).toBe('+46 ')
    expect(formatDefaultValue('voip', '', SE)).toBe('+46 ')
    expect(formatDefaultValue('dht', '', SE)).toBe('')
  })
})

describe('formatDisplayValue', () => {
  it('Strips country code for non-phone numbers', () => {
    expect(formatDisplayValue(null, '+46 763 40 96 06', SE)).toBe(
      '+46 76 340 96 06'
    )
    expect(formatDisplayValue('voip', '+46 763 40 96 06', SE)).toBe(
      '+46 76 340 96 06'
    )
    expect(formatDisplayValue('dht', '+46 763 40 96 06', SE)).toBe(
      '763 40 96 06'
    )

    expect(formatDisplayValue(null, '+99 763 40 96 06', XX)).toBe(
      '+99 763 40 96 06'
    )
    expect(formatDisplayValue('voip', '+99 763 40 96 06', XX)).toBe(
      '+99 763 40 96 06'
    )
    expect(formatDisplayValue('dht', '+99 763 40 96 06', XX)).toBe(
      '763 40 96 06'
    )
  })
})

describe('parseNumber', () => {
  it('Returns number if valid', () => {
    expect(parseNumber('763409606', SE)).toBe('763409606')
    expect(parseNumber('0763409606', SE)).toBe('763409606')
    expect(parseNumber('+46763409606', SE)).toBe('763409606')
  })
  it('Returns null if invalid', () => {
    expect(parseNumber('1', SE)).toBe(null)
  })
})

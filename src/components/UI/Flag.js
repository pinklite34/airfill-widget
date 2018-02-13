import React from 'react'
import { css } from 'glamor'
import flags from '../flags'
import defaultFlag from 'flag-icons/flags/flags-iso/flat/24/_unknown.png'

const styles = {
  image: css({
    margin: '-3px 0',
    width: 24,
    height: 24,
  }),
}

const Flag = ({ country }) => (
  <img
    src={(country && flags[country]) || defaultFlag}
    alt={country}
    {...styles.image}
  />
)

export default Flag

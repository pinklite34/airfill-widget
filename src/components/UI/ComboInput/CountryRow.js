import React from 'react'
import Row from './Row'
import Flag from '../Flag'

const CountryRow = ({ item, ...props }) => (
  <Row {...props} icon={<Flag country={item.alpha2} />} content={item.name} />
)

export default CountryRow

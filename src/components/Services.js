import React from 'react';
import { css } from 'glamor';
import { Button } from 'react-toolbox/lib/button';
import ServiceGrid from './ServiceGrid';

const styles = {
  header: css({
    backgroundColor: '#EEEEEE',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }),
  changeButton: css({
    backgroundColor: '#fff !important',
    fontSize: '14px !important',
    margin: '-4px !important'
  }),
  serviceText: css({
    fontSize: 14
  })
};

const Services = () => (
  <div>
    <div {...styles.header}>
      <div {...styles.serviceText}>Services in Sweden.</div>
      <Button {...styles.changeButton}>Change country</Button>
    </div>
    <ServiceGrid />
  </div>
);

export default Services;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import defaultFlag from '../../unknown-flag.png';

const styles = {
  image: css({
    margin: '-3px 0',
    width: 24,
    height: 24,
  }),
};

export default class Flag extends Component {
  static propTypes = {
    country: PropTypes.string,
  };

  state = {
    flags: {},
  };

  componentWillMount = () => {
    import(/* webpackChunkName: "flags" */ '../flags').then(flags =>
      this.setState({ flags: flags.default })
    );
  };

  render() {
    const { country } = this.props;
    const { flags } = this.state;

    return (
      <img
        src={(country && flags[country]) || defaultFlag}
        alt={country}
        {...styles.image}
      />
    );
  }
}

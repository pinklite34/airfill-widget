import * as PropTypes from 'prop-types';
import * as React from 'react';
import Media from 'react-media';

import theme from '../theme';
import { fromWindow } from './globals';

export default class DeviceInfo extends React.PureComponent<any> {
  state = {
    width: 0,
    height: 0,
    is: { mobile: false, tablet: false, desktop: false },
    lessThan: { mobile: false, tablet: false },
    greaterThan: { mobile: true, tablet: true },
    deviceType: '',
  };

  componentDidMount() {
    this.onResize();
    this.setDeviceType();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const width = fromWindow('innerWidth');
    const height = fromWindow('innerHeight');
    const mobilePx = parseInt(theme.bp.mobile);
    const tabletPx = parseInt(theme.bp.tablet);

    this.setState({
      width,
      height,
      is: {
        mobile: width < mobilePx,
        tablet: width >= mobilePx && width < tabletPx,
        desktop: width >= tabletPx,
      },
      lessThan: {
        tablet: width < mobilePx,
        desktop: width < tabletPx,
      },
      greaterThan: {
        mobile: width >= mobilePx,
        tablet: width >= tabletPx,
      },
    });
  };

  setDeviceType() {
    const navigator = fromWindow('navigator');
    if (!navigator) {
      return;
    }
    const { userAgent } = navigator;

    if (userAgent.match(/iPhone|iPad|iPod/)) {
      this.setState({ deviceType: 'ios' });
    } else if (userAgent.match(/Android/)) {
      this.setState({ deviceType: 'android' });
    }
  }

  render() {
    const { width, height, lessThan, greaterThan, deviceType, is } = this.state;

    const func = this.props.children as (opts: any) => void;

    return (
      <Media query="(-moz-touch-enabled: 1), (pointer: coarse)">
        {isMobile =>
          func({
            width,
            height,
            is,
            lessThan,
            greaterThan,
            isMobile,
            deviceType,
          })
        }
      </Media>
    );
  }
}

import * as React from 'react';
import Media from 'react-media';

import { DeviceInfo, DeviceType } from '../types';

import theme from '../theme';
import { fromWindow } from './globals';

interface DeviceInfoProps {
  children: (state: DeviceInfo) => void;
}

export default class DeviceInfoProvider extends React.PureComponent<
  DeviceInfoProps,
  DeviceInfo
> {
  state = {
    width: 0,
    height: 0,
    is: { mobile: false, tablet: false, desktop: false },
    lessThan: { tablet: false, desktop: false },
    greaterThan: { mobile: true, tablet: true },
    deviceType: DeviceType.web,
    isMobile: false,
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

    if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
      this.setState({ deviceType: DeviceType.ios });
    } else if (navigator.userAgent.match(/Android/)) {
      this.setState({ deviceType: DeviceType.android });
    }
  }

  render() {
    const { width, height, lessThan, greaterThan, deviceType, is } = this.state;

    return (
      <Media query="(-moz-touch-enabled: 1), (pointer: coarse)">
        {isMobile =>
          this.props.children({
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

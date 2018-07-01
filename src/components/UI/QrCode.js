import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import QRious from 'qrious';

class QrCode extends PureComponent {
  constructor(props) {
    super(props);

    const qr = new QRious(props);
    this.state = {
      qr,
      src: qr.toDataURL(this.props.mime || 'image/png'),
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) { // eslint-disable-line
    const { qr } = this.state;
    qr.set(newProps);

    this.setState({
      src: qr.toDataURL(newProps.mime || 'image/png'),
    });
  }

  render() {
    return <img src={this.state.src} />;
  }
}

QrCode.propTypes = {
  mime: PropTypes.string,
};

export default QrCode;

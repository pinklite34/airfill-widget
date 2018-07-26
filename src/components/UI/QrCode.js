import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import QRious from 'qrious';

class QrCode extends PureComponent {
  constructor(props) {
    super(props);

    const qr = new QRious(props);
    this.state = {
      qr,
      src: qr.toDataURL(props.mime || 'image/png'),
    };
  }

  componentDidUpdate() {
    const { qr } = this.state;
    const { mime } = this.props;
    qr.set(this.props);

    this.setState({
      src: qr.toDataURL(mime || 'image/png'),
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

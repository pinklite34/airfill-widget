import React from 'react';
import QRious from 'qrious';
import PropTypes from 'prop-types';

class QrCode extends React.Component {

  constructor(props) {
    super(props);

    const qr = new QRious(props);
    this.state = {
      qr,
      src: qr.toDataURL(this.props.mime || 'image/png')
    };
  }

  componentWillReceiveProps(newProps) {
    const { qr } = this.state;
    qr.set(newProps);

    this.setState({
      src: qr.toDataURL(newProps.mime || 'image/png')
    });
  }

  render() {
    return <img src={this.state.src} />
  }
}

QrCode.propTypes = {

};

export default QrCode;

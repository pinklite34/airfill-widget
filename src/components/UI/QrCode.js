import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import QRious from 'qrious';

const QrContainer = styled('div')`
  background-image: url(${p => p.src});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
`;

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
    return <QrContainer src={this.state.src} />;
  }
}

QrCode.propTypes = {
  mime: PropTypes.string,
};

export default QrCode;

import * as QRious from 'qrious';
import * as React from 'react';
import styled from 'react-emotion';

const QrContainer = styled('div')`
  background-image: url(${(p: any) =>  p.src});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
`;

interface QrCodeProps {
  mime?: string;
  [x: string]: any;
}

interface QrCodeState {
  qr: QRious;
  src: string;
}

class QrCode extends React.PureComponent<QrCodeProps, QrCodeState> {
  state: QrCodeState;

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

export default QrCode;

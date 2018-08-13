import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isMobileApp } from './globals';

export const WidgetRectContext = React.createContext<any>('widgetRect');

export default class WidgetRect extends React.PureComponent<any> {
  private childRef;

  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  state = {
    rect: {},
  };

  componentDidMount() {
    this.onUpdate();
    window.addEventListener('resize', this.onUpdate);
    window.addEventListener('scroll', this.onUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onUpdate);
    window.removeEventListener('scroll', this.onUpdate);
  }

  onUpdate = () => {
    const ref = this.childRef.current;
    const rect =
      ref && ref.getBoundingClientRect && ref.getBoundingClientRect();
    rect && this.setState({ rect });
  };

  render() {
    const { children } = this.props;
    const { rect } = this.state;

    const Provider = WidgetRectContext.Provider as any;

    return isMobileApp() ? (
      children
    ) : (
      <Provider value={{ rect, onUpdate: this.onUpdate }}>
        <div ref={this.childRef}>{children}</div>
      </Provider>
    );
  }
}

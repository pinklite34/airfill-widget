import React, { PureComponent, createRef, createContext } from 'react';
import PropTypes from 'prop-types';

export const WidgetRectContext = createContext('widgetRect');

export default class WidgetRect extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.childRef = createRef();
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

    return (
      <WidgetRectContext.Provider value={{ rect, onUpdate: this.onUpdate }}>
        <div ref={this.childRef}>{children}</div>
      </WidgetRectContext.Provider>
    );
  }
}

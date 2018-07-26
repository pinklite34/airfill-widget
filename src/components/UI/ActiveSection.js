import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { transProp } from '../../lib/prop-types';
import { fromWindow } from '../../lib/globals';
import { WidgetRectContext } from '../../lib/WidgetRect';
import DeviceInfo from '../../lib/DeviceInfo';

import ErrorBanner from './ErrorBanner';

const Container = styled('div')`
  background-color: #fafafa;
`;

const Content = styled('div')`
  padding: ${p => p.padding};
`;

function isFixed({ top, height }) {
  return top + height > fromWindow('innerHeight');
}

function getNextHeight(tight) {
  const padding = tight ? 8 : 16;
  return `${padding * 2 + 36 + 1}px`;
}

const NextContainer = styled('div')`
  background-color: #fafafa;
  padding: ${p => (p.tight ? '8px' : '16px')};
  border-top: ${p => p.theme.bd.primary};
  position: ${p => (p.fixed ? 'fixed' : 'absolute')};
  bottom: 0;
  width: ${p => p.width || '100%'};
  max-height: ${p => p.height};
  height: ${p => p.height};

  @media (max-width: ${p => p.theme.bp.mobile}) {
    padding: 8px;
  }
`;

class ActiveSectionNext extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    fixed: PropTypes.bool,
    tight: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
  };

  componentDidMount() {
    this.props.onUpdate();
  }

  render() {
    const { children, fixed, tight, onUpdate, width, height } = this.props;
    return (
      <div style={{ position: !fixed && 'relative' }}>
        <NextContainer
          onClick={onUpdate}
          tight={tight}
          fixed={fixed}
          heigh={height}
          width={width}>
          {children}
        </NextContainer>
        <div style={{ height }} />
      </div>
    );
  }
}

export default function ActiveSection({
  children,
  renderNextButton,
  padding,
  error,
  ...props
}) {
  return (
    <DeviceInfo>
      {({ lessThan }) => (
        <Container {...props}>
          {error && <ErrorBanner text={error.message || error} />}
          <Content padding={padding}>{children}</Content>
          {renderNextButton && (
            <WidgetRectContext.Consumer>
              {({ rect, onUpdate }) => (
                <ActiveSectionNext
                  fixed={isFixed(rect)}
                  onUpdate={onUpdate}
                  tight={lessThan.tablet}
                  width={rect && `${rect.width}px`}
                  height={getNextHeight(lessThan.tablet)}>
                  {renderNextButton()}
                </ActiveSectionNext>
              )}
            </WidgetRectContext.Consumer>
          )}
        </Container>
      )}
    </DeviceInfo>
  );
}

ActiveSection.propTypes = {
  children: PropTypes.node,
  renderNextButton: PropTypes.func,
  padding: PropTypes.string,
  error: PropTypes.oneOfType([
    transProp,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { fromWindow, isMobileApp } from '../../lib/globals';
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
  left: ${p => p.isMobile && 0};
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
    onUpdate: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  componentDidMount() {
    this.props.onUpdate && this.props.onUpdate();
  }

  render() {
    const {
      children,
      fixed,
      tight,
      onUpdate,
      width,
      height,
      isMobile,
    } = this.props;
    return (
      <div style={{ position: !fixed && !isMobile && 'relative' }}>
        <NextContainer
          isMobile={isMobile}
          onClick={onUpdate}
          tight={tight}
          fixed={fixed}
          heigh={height}
          width={width}>
          {children}
        </NextContainer>
        {!isMobile && <div style={{ height }} />}
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
  const errorMsg = error && (error.message || error);

  return (
    <DeviceInfo>
      {({ lessThan }) => (
        <Container {...props}>
          {errorMsg && <ErrorBanner text={errorMsg} />}
          <Content padding={padding}>{children}</Content>
          {renderNextButton && isMobileApp() ? (
            <ActiveSectionNext
              fixed={true}
              isMobile
              tight={lessThan.tablet}
              height={getNextHeight(lessThan.tablet)}>
              {renderNextButton()}
            </ActiveSectionNext>
          ) : renderNextButton ? (
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
          ) : null}
        </Container>
      )}
    </DeviceInfo>
  );
}

ActiveSection.displayName = 'ActiveSection';

ActiveSection.propTypes = {
  children: PropTypes.node,
  renderNextButton: PropTypes.func,
  padding: PropTypes.string,
  error: PropTypes.any,
};

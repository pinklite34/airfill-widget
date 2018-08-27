import * as React from 'react';
import styled from 'react-emotion';

import DeviceInfo from '../../lib/DeviceInfo';
import { fromWindow, isMobileApp } from '../../lib/globals';
import { WidgetRectContext } from '../../lib/WidgetRect';

import { ErrorProp } from 'lib/prop-types';
import ErrorBanner from './ErrorBanner';

const Container = styled('div')`
  background-color: #fafafa;
`;

const Content = styled('div')`
  padding: ${(p: any) => p.padding};
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
  padding: ${(p: any) => (p.tight ? '8px' : '16px')};
  border-top: ${(p: any) => p.theme.bd.primary};
  position: ${(p: any) => (p.fixed ? 'fixed' : 'absolute')};
  bottom: 0;
  left: ${(p: any) => p.isMobile && 0};
  width: ${(p: any) => p.width || '100%'};
  max-height: ${(p: any) => p.height};
  height: ${(p: any) => p.height};

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    padding: 8px;
  }
`;

interface ActiveSectionNextProps {
  fixed: boolean;
  tight: boolean;
  onUpdate?: () => void;
  width?: string;
  height?: string;
  isMobile?: boolean;
  children?: any;
}

class ActiveSectionNext extends React.PureComponent<ActiveSectionNextProps> {
  componentDidMount() {
    const { onUpdate } = this.props;
    if (onUpdate) {
      onUpdate();
    }
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
      <div css={{ position: !fixed && !isMobile && 'relative' } as any}>
        <NextContainer
          isMobile={isMobile}
          onClick={onUpdate}
          tight={tight}
          fixed={fixed}
          heigh={height}
          width={width}
        >
          {children}
        </NextContainer>
        {!isMobile && <div css={{ height }} />}
      </div>
    );
  }
}

interface ActiveSectionProps {
  children?: any;
  renderNextButton?: () => any;
  padding?: string;
  error?: ErrorProp;
}

export default function ActiveSection({
  children,
  renderNextButton,
  padding,
  error,
  ...props
}: ActiveSectionProps) {
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
              height={getNextHeight(lessThan.tablet)}
            >
              {renderNextButton()}
            </ActiveSectionNext>
          ) : renderNextButton ? (
            <WidgetRectContext.Consumer>
              {({ rect, onUpdate }) => (
                <ActiveSectionNext
                  fixed={isFixed(rect)}
                  onUpdate={onUpdate}
                  tight={lessThan.tablet}
                  width={rect && `${rect.width - 1}px`}
                  height={getNextHeight(lessThan.tablet)}
                >
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

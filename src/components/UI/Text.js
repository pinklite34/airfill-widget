import React from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

function getColor({ color, error, success, theme }, defaultColor) {
  return (
    color ||
    (error ? theme.tx.error : success ? theme.tx.success : defaultColor)
  );
}

export const H1Text = styled('h1')`
  color: ${p => getColor(p, p.theme.tx.primary)};
  padding: ${p => p.padding || 0};
  margin: ${p => p.margin || (p.tight ? 0 : '16px 0')};
  text-align: ${p => (p.centered ? 'center' : 'left')};
  font-size: ${p => p.size || '16px'};
  line-height: 1.5;
  text-decoration: ${p => p.underline && 'underline'};
  width: ${p => p.width};

  * {
    color: ${p => getColor(p, p.theme.tx.primary)};
  }
`;

export const H3Text = styled('h3')`
  color: ${p => getColor(p, p.theme.tx.primary)};
  margin: ${p => p.margin || (p.tight ? 0 : '14px 0')};
  padding: ${p => p.padding || 0};
  text-align: ${p => (p.centered ? 'center' : 'left')};
  font-size: ${p => p.size || '14px'};
  font-weight: 500;
  line-height: 1.5;
  text-decoration: ${p => p.underline && 'underline'};
  width: ${p => p.width};

  * {
    color: ${p => getColor(p, p.theme.tx.primary)};
  }
`;

export const PText = styled('p')`
  color: ${p => getColor(p, p.theme.tx.secondary)};
  margin: ${p => p.margin || (p.tight ? 0 : '8px 0')};
  padding: ${p => p.padding || 0};
  font-size: ${p => p.size || '12px'};
  text-align: ${p => (p.centered ? 'center' : 'left')};
  line-height: ${p => p.lineHeight || 1.4};
  text-decoration: ${p => p.underline && 'underline'};
  width: ${p => p.width};

  * {
    color: ${p => getColor(p, p.theme.tx.secondary)};
  }
`;

function getComponent(type) {
  return {
    h1: H1Text,
    h3: H3Text,
    p: PText,
  }[type];
}

export default function Text({
  id,
  type,
  color,
  error,
  success,
  small,
  size,
  centered,
  margin,
  padding,
  tight,
  underline,
  style,
  width,
  className,
  ...transProps
}) {
  const TextComponent = getComponent(type);
  const textProps = {
    color,
    error,
    success,
    small,
    size,
    centered,
    margin,
    padding,
    tight,
    underline,
    style,
    width,
    className,
  };

  const children = id ? (
    <Trans i18nKey={id} {...transProps} />
  ) : (
    transProps.children
  );

  return TextComponent ? (
    <TextComponent {...textProps} style={{ color: 'red !important' }}>
      {children}
    </TextComponent>
  ) : (
    children || null
  );
}

Text.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['h1', 'h3', 'p']),
  color: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  small: PropTypes.bool,
  size: PropTypes.string,
  centered: PropTypes.bool,
  margin: PropTypes.string,
  padding: PropTypes.string,
  tight: PropTypes.bool,
  underline: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  width: PropTypes.string,
};

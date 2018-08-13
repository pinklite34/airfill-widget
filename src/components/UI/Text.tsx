import * as React from 'react';
import { Trans } from 'react-i18next';
import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

function getColor({ color, error, success, theme }, defaultColor) {
  return (
    color ||
    (error ? theme.tx.error : success ? theme.tx.success : defaultColor)
  );
}

export const H1Text = styled('h1')`
  color: ${(p: any) =>  getColor(p, p.theme.tx.primary)};
  padding: ${(p: any) =>  p.padding || 0};
  margin: ${(p: any) =>  p.margin || (p.tight ? 0 : '16px 0')};
  text-align: ${(p: any) =>  (p.centered ? 'center' : 'left')};
  font-size: ${(p: any) =>  p.size || '18px'};
  font-weight: ${(p: any) =>  p.weight || 500};
  line-height: 1.5;
  text-decoration: ${(p: any) =>  p.underline && 'underline'};
  width: ${(p: any) =>  p.width};

  * {
    color: ${(p: any) =>  getColor(p, p.theme.tx.primary)};
  }
`;

export const H3Text = styled('h3')`
  color: ${(p: any) =>  getColor(p, p.theme.tx.secondary)};
  margin: ${(p: any) =>  p.margin || (p.tight ? 0 : '14px 0')};
  padding: ${(p: any) =>  p.padding || 0};
  text-align: ${(p: any) =>  (p.centered ? 'center' : 'left')};
  font-size: ${(p: any) =>  p.size || '14px'};
  font-weight: ${(p: any) =>  p.weight || 500};
  line-height: 1.5;
  text-decoration: ${(p: any) =>  p.underline && 'underline'};
  width: ${(p: any) =>  p.width};

  * {
    color: ${(p: any) =>  getColor(p, p.theme.tx.secondary)};
  }
`;

export const PText = styled('p')`
  color: ${(p: any) =>  getColor(p, p.theme.tx.secondary)};
  margin: ${(p: any) =>  p.margin || (p.tight ? 0 : '8px 0')};
  padding: ${(p: any) =>  p.padding || 0};
  font-size: ${(p: any) =>  p.size || '12px'};
  font-weight: ${(p: any) =>  p.weight};
  text-align: ${(p: any) =>  (p.centered ? 'center' : 'left')};
  line-height: ${(p: any) =>  p.lineHeight || 1.4};
  text-decoration: ${(p: any) =>  p.underline && 'underline'};
  width: ${(p: any) =>  p.width};

  * {
    color: ${(p: any) =>  getColor(p, p.theme.tx.secondary)};
  }
`;

const LinkText = styled(PText)`
  color: ${(p: any) =>  getColor(p, p.theme.tx.link)};
  text-decoration: none;
  cursor: pointer;

  * {
    color: ${(p: any) =>  getColor(p, p.theme.tx.link)};
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }
`;

function getComponent(type) {
  return {
    h1: H1Text,
    h3: H3Text,
    p: PText,
    link: LinkText,
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
  weight,
  className,
  dangerouslySetInnerHTML,
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
    weight,
    className,
    dangerouslySetInnerHTML,
  };

  const children = id ? (
    <Trans i18nKey={`widget:${id}`} {...transProps} />
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

/* Text.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['h1', 'h3', 'p', 'link']),
  color: PropTypes.string,
  error: PropTypes.any,
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
  weight: PropTypes.number,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }),
};
 */
import * as PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'react-emotion';
import { Trans } from 'react-i18next';

function getColor({ color, error, success, theme }, defaultColor) {
  return (
    color ||
    (error ? theme.tx.error : success ? theme.tx.success : defaultColor)
  );
}

export const H1Text = styled('h1')`
  color: ${(p: any) => getColor(p, p.theme.tx.primary)};
  padding: ${(p: any) => p.padding || 0};
  margin: ${(p: any) => p.margin || (p.tight ? 0 : '16px 0')};
  text-align: ${(p: any) => (p.centered ? 'center' : 'left')};
  font-size: ${(p: any) => p.size || '18px'};
  font-weight: ${(p: any) => p.weight || 500};
  line-height: 1.5;
  text-decoration: ${(p: any) => p.underline && 'underline'};
  width: ${(p: any) => p.width};

  * {
    color: ${(p: any) => getColor(p, p.theme.tx.primary)};
  }
`;

export const H3Text = styled('h3')`
  color: ${(p: any) => getColor(p, p.theme.tx.secondary)};
  margin: ${(p: any) => p.margin || (p.tight ? 0 : '14px 0')};
  padding: ${(p: any) => p.padding || 0};
  text-align: ${(p: any) => (p.centered ? 'center' : 'left')};
  font-size: ${(p: any) => p.size || '14px'};
  font-weight: ${(p: any) => p.weight || 500};
  line-height: 1.5;
  text-decoration: ${(p: any) => p.underline && 'underline'};
  width: ${(p: any) => p.width};

  * {
    color: ${(p: any) => getColor(p, p.theme.tx.secondary)};
  }
`;

export const PText = styled('p')`
  color: ${(p: any) => getColor(p, p.theme.tx.secondary)};
  margin: ${(p: any) => p.margin || (p.tight ? 0 : '8px 0')};
  padding: ${(p: any) => p.padding || 0};
  font-size: ${(p: any) => p.size || '12px'};
  font-weight: ${(p: any) => p.weight};
  text-align: ${(p: any) => (p.centered ? 'center' : 'left')};
  line-height: ${(p: any) => p.lineHeight || 1.4};
  text-decoration: ${(p: any) => p.underline && 'underline'};
  width: ${(p: any) => p.width};

  * {
    color: ${(p: any) => getColor(p, p.theme.tx.secondary)};
  }
`;

const LinkText = styled(PText)`
  color: ${(p: any) => getColor(p, p.theme.tx.link)};
  text-decoration: none;
  cursor: pointer;

  * {
    color: ${(p: any) => getColor(p, p.theme.tx.link)};
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

interface TextProps {
  id: string;
  type: 'h1' | 'h3' | 'p' | 'link';
  color?: string;
  error?: any;
  success?: boolean;
  small?: boolean;
  size?: string;
  centered?: boolean;
  margin?: string;
  padding?: string;
  tight?: boolean;
  underline?: boolean;
  css?: React.CSSProperties;
  className?: string;
  width?: string;
  weight?: number;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  children?: any;
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
  css,
  width,
  weight,
  className,
  dangerouslySetInnerHTML,
  ...transProps
}: TextProps) {
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
    css,
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

  const s = <p css={{}} />;

  return TextComponent ? (
    <TextComponent {...textProps} css={{ color: 'red !important' }}>
      {children}
    </TextComponent>
  ) : (
    children || null
  );
}

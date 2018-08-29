import * as React from 'react';
import styled from 'react-emotion';

import DeviceInfoProvider from '../../lib/DeviceInfoProvider';
import { TransProp } from '../../types';
import Button from './Button';
import Icon from './Icon';
import Text from './Text';

const Container = styled('div')`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  border-bottom: ${(p: any) => p.theme.bd.primary};
  min-height: 60px;
`;

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
`;

interface CollapsedProps {
  title: TransProp;
  type: string;
  icon?: string | any;
  hideButton?: boolean;
  onClick?: () => void;
  alt?: string;
}

export default function Collapsed({
  icon,
  title,
  onClick,
  type,
  hideButton,
  alt,
}: CollapsedProps) {
  return (
    <DeviceInfoProvider>
      {({ lessThan }) => (
        <Container>
          <Left>
            <Icon
              src={icon}
              alt={alt || (title && title.id) || title}
              margin="0 16px 0 0"
            />
            {typeof title === 'string' ? (
              <Text type="p" size="16px">
                {title}
              </Text>
            ) : title && title.id ? (
              <Text type="p" size="16px" {...title} />
            ) : (
              title
            )}
          </Left>
          {hideButton ? null : lessThan.tablet ? (
            <Button
              small
              white
              onClick={onClick}
              text={{ id: 'button.change.default', children: 'Change' }}
            />
          ) : (
            <Button
              small
              white
              onClick={onClick}
              text={{
                id: `button.change.${type}`,
                children: `Change ${type}`,
              }}
            />
          )}
        </Container>
      )}
    </DeviceInfoProvider>
  );
}

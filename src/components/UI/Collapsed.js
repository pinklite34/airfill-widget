import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import DeviceInfo from '../../lib/DeviceInfo';

import Button from './Button';
import Text from './Text';
import Icon from './Icon';
import { transProp } from '../../lib/prop-types';

const Container = styled('div')`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  border-bottom: ${p => p.theme.bd.primary};
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

export default function Collapsed({
  icon,
  title,
  onClick,
  type,
  hideButton,
  alt,
}) {
  return (
    <DeviceInfo>
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
    </DeviceInfo>
  );
}

Collapsed.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  hideButton: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([transProp, PropTypes.node]),
  alt: PropTypes.string,
};

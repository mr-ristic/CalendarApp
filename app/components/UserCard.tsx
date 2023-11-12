import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Avatar,
  SelectedUserContainer,
  UserContainer,
  UserName,
  UserNotification,
  NotificationText,
  AvatarWrapper
} from './styles';
import { UserProps } from './types';

export const UserCard = React.memo(function UserCard(props: UserProps) {
  const Container = props.isSelected ? SelectedUserContainer : UserContainer;

  return (
    <TouchableOpacity onPress={() => props.onSelect && props.onSelect(props.id)}>
      <Container>
        <AvatarWrapper>
          <Avatar source={{ uri: props.avatar }} />
          <UserNotification $selected={true}>
            <NotificationText>{props.count}</NotificationText>
          </UserNotification>
        </AvatarWrapper>

        {props.isSelected && <UserName>{props.firstName}</UserName>}
      </Container>
    </TouchableOpacity>
  );
});

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, SelectedUserContainer, UserContainer, UserName } from './styles';
import { UserProps } from './types';

export const UserCard = React.memo(function UserCard(props: UserProps) {
  const Container = props.isSelected ? SelectedUserContainer : UserContainer;

  return (
    <TouchableOpacity onPress={() => props.onSelect && props.onSelect(props.id)}>
      <Container>
        <Avatar source={{ uri: props.avatar }} />
        {props.isSelected && <UserName>{props.firstName}</UserName>}
      </Container>
    </TouchableOpacity>
  );
});

import * as React from 'react';
import { UserListProps } from './types';
import { UserCard } from './UserCard';
import { UserSlider } from './styles';

export const UserList = React.memo(function UserList(props: UserListProps) {
  const { selectedUser, selectUser, users } = props;
  return (
    <UserSlider horizontal showsHorizontalScrollIndicator={false}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          {...user}
          isSelected={user.id === selectedUser?.id}
          onSelect={selectUser}
        />
      ))}
    </UserSlider>
  );
});

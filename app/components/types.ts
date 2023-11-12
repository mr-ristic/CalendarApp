import { User } from 'app/models';

export interface UserProps {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName?: string;
  avatar: string;
  count?: number;
  onSelect?: (id: number) => void;
}

export interface UserListProps {
  users: UserProps[];
  selectUser: (id: number) => void;
  selectedUser: User | null;
}

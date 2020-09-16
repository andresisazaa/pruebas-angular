import { User } from '../../models/user.model';

export interface UsersState {
  users: User[];
}

export const initialUsersState: UsersState = {
  users: [],
};

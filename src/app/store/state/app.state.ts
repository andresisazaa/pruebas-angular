import { UsersState, initialUsersState } from './users.state';

export interface AppState {
  users: UsersState;
}

export const initialState: AppState = {
  users: initialUsersState,
};

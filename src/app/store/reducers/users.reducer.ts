import { createReducer, on, Action } from '@ngrx/store';
import * as usersActions from '../actions/users.actions';
import { initialUsersState, UsersState } from '../state/users.state';

const reducer = createReducer(
  initialUsersState,
  on(usersActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  }))
);

export function usersReducer(state: UsersState, action: Action) {
  return reducer(state, action);
}

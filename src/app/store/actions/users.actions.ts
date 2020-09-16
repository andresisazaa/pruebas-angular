import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const fetchUsers = createAction('[Users] getUsers');
export const fetchUsersSuccess = createAction(
  '[Users] getUsers success',
  props<{ users: User[] }>()
);
export const fetchUsersFailed = createAction(
  '[Users] getUsers failed',
  props<{ error: any }>()
);

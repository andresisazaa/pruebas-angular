import { ActionReducerMap } from '@ngrx/store';
import { usersReducer } from './users.reducer';
import { AppState } from '../state/app.state';

export const appReducers: ActionReducerMap<AppState> = {
    users: usersReducer
}
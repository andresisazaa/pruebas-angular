import { AppState } from '../state/app.state';
import { User } from '../../models/user.model';

export const usersSelect = (state: AppState): User[] => state.users.users;

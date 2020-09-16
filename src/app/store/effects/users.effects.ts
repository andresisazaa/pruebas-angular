import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as usersActions from '../actions/users.actions';
import { User } from '../../models/user.model';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(usersActions.fetchUsers),
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((users: User[]) => usersActions.fetchUsersSuccess({ users })),
          catchError((error) => of(usersActions.fetchUsersFailed({ error })))
        );
      })
    );
  });
}

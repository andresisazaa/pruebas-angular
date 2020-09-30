import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fetchUsers } from 'src/app/store/actions/users.actions';
import { usersSelect } from '../../store/selectors/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  usersFromService: User[];
  usersFromStore: User[];
  userSelected: User;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.subscribeToUserService());
    this.subscription.add(this.subscribeToUserStore());
  }

  getUsers(): void {
    this.store.dispatch(fetchUsers());
  }

  getUserSelected(user: User): void {
    this.userSelected = user;
  }

  subscribeToUserService(): Subscription {
    return this.userService
      .getUsers()
      .subscribe((users: User[]) => (this.usersFromService = users));
  }

  subscribeToUserStore(): Subscription {
    return this.store
      .pipe(select(usersSelect))
      .subscribe((users: User[]) => (this.usersFromStore = users));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

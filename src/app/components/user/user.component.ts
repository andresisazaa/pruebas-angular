import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() user: User;
  @Output() onSelectUser: EventEmitter<User>;

  constructor() {
    this.onSelectUser = new EventEmitter<User>();
  }

  selectUser(): void {
    this.onSelectUser.emit(this.user);
  }
}

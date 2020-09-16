import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'https://reqres.in/api';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get(`${this.URL}/users`).pipe(
      map((res: { data: [] }) => {
        const users: User[] = res.data.map((user) => ({
          id: user['id'],
          email: user['email'],
          firstname: user['first_name'],
          lastname: user['last_name'],
          avatar: user['avatar'],
        }));
        return users;
      })
    );
  }
}

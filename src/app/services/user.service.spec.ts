import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia devolver un Observable', () => {
    expect(service.getUsers()).toBeInstanceOf(Observable)
  })

  it('should test http.get', () => {
    const testUsers: User[] = [
      {
        id: 11,
        email: 'george.edwards@reqres.in',
        firstname: 'George',
        lastname: 'Edwards',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg'
        },
        {
        id: 12,
        email: 'rachel.howell@reqres.in',
        firstname: 'Rachel',
        lastname: 'Howell',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg'
        }
    ];
    service.getUsers().subscribe((users) => {
      expect(testUsers).toBe(users);
    });
    const req = httpTestingController.expectOne(`${service.URL}/users`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testUsers);
  });
});

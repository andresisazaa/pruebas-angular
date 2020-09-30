import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { fetchUsers } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/state/app.state';
import { By } from '@angular/platform-browser';
import { UserComponent } from '../user/user.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: Partial<UserService>;
  let store: MockStore;
  usersService = {
    getUsers: () =>
      of<User[]>([
        {
          id: 9,
          email: 'tobias.funke@reqres.in',
          firstname: 'Tobias',
          lastname: 'Funke',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg',
        },
        {
          id: 10,
          email: 'byron.fields@reqres.in',
          firstname: 'Byron',
          lastname: 'Fields',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg',
        },
      ]),
  };

  const initialState: Partial<AppState> = {
    users: {
      users: [
        {
          id: 5,
          email: 'charles.morris@reqres.in',
          firstname: 'Charles',
          lastname: 'Morris',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg',
        },
      ],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UserComponent],
      providers: [
        { provide: UserService, useValue: usersService },
        provideMockStore({ initialState }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    usersService = TestBed.inject(UserService);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia instanciar el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia estar instanciada la subscription', () => {
    const subscription = component.subscription;
    expect(subscription).toBeInstanceOf(Subscription);
  });

  it('UsersFromService deberia ser un Array', () => {
    const users = component.usersFromService;
    expect(Array.isArray(users)).toBe(true);
  });

  it('Deberia llamar subscribeToUsers cuando el componente se inicializa', () => {
    const subscribeToUsersSpy = jest.spyOn(component, 'subscribeToUserService');
    component.ngOnInit();
    expect(subscribeToUsersSpy).toHaveBeenCalled();
  });

  it('Deberia retornar un Observable', () => {
    const users$ = usersService.getUsers();
    expect(users$).toBeInstanceOf(Observable);
  });

  it('Deberia retornar una instancia de Subscription', () => {
    const subscription = component.subscribeToUserService();
    expect(subscription).toBeInstanceOf(Subscription);
  });

  it('Deberia guardar los usuarios del servicio en la variable users', () => {
    component.subscribeToUserService();
    let users: User[] = [];
    usersService
      .getUsers()
      .subscribe((usersMock: User[]) => (users = usersMock));
    expect(component.usersFromService).toEqual(users);
  });

  it('Deberia desuscribirse cuando componente se destruye', () => {
    const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('Deberia llamar fetchUsers cuando se da click en button.btn.btn-primary', () => {
    const button: DebugElement = fixture.debugElement.query(
      By.css('button.btn.btn-primary')
    );
    jest.spyOn(component, 'getUsers');
    button.triggerEventHandler('click', null);
    expect(component.getUsers).toHaveBeenCalled();
  });

  it('Deberia hacer el dispatch de fetchUsers cuando se llama getUsers()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.getUsers();
    expect(dispatchSpy).toBeCalledWith(fetchUsers());
  });

  it('Deberia estar suscrito a los usuarios del Store', () => {
    const usersMock: User[] = [
      {
        id: 8,
        email: 'lindsay.ferguson@reqres.in',
        firstname: 'Lindsay',
        lastname: 'Ferguson',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg',
      },
    ];
    store.setState({ users: { users: usersMock } });
    expect(component.usersFromStore).toEqual(usersMock);
  });

  it('Debería guardarse el usuario seleccionado cuando se emite onSelectUser', () => {
    const user: User = {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      firstname: 'Lindsay',
      lastname: 'Ferguson',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg',
    };
    const userComponent: UserComponent = fixture.debugElement.query(
      By.directive(UserComponent)
    ).componentInstance;
    userComponent.onSelectUser.emit(user);
    expect(component.userSelected).toEqual(user);
  });
});

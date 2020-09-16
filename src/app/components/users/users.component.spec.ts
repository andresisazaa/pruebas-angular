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

describe('UsersComponent', () => {
  describe('UsersComponent unit tests', () => {
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
        declarations: [UsersComponent],
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

    it('Deberia estar instanciada la variable subscription', () => {
      const subscription = component.subscription;
      expect(subscription).toBeInstanceOf(Subscription);
      expect(subscription).toBeDefined();
    });

    it('Deberia retornar un Array', () => {
      const users = component.usersFromService;
      expect(Array.isArray(users)).toBe(true);
    });

    it('Deberia llamar subscribeToUsers cuando el componente se inicializa', () => {
      const subscribeToUsersSpy = jest.spyOn(
        component,
        'subscribeToUserService'
      );
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

    it('Deberia llamar el unsubscribe cuando el componente se destruye', () => {
      const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('Debería llamar fetchUsers cuando se da click en button.btn', () => {
      const button: DebugElement = fixture.debugElement.query(
        By.css('button.btn')
      );
      jest.spyOn(component, 'getUsers');
      button.triggerEventHandler('click', null);
      expect(component.getUsers).toHaveBeenCalled();
    });

    it('Debería llamar fetchUsers cuando se da click en button.btn V2', () => {
      const compiled: HTMLElement = fixture.nativeElement;
      const button: HTMLButtonElement = compiled.querySelector('button.btn');
      jest.spyOn(component, 'getUsers');
      button.click();
      expect(component.getUsers).toHaveBeenCalled();
    });

    it('Deberia hacer el dispatch de fetchUsers', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.getUsers();
      expect(dispatchSpy).toBeCalledWith(fetchUsers());
    });

    it('Deberia guardar los usuarios del store cuando este cambia', () => {
      const usersMock: User[] = [
        {
          id: 7,
          email: 'michael.lawson@reqres.in',
          firstname: 'Michael',
          lastname: 'Lawson',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg',
        },
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
      expect(component.usersFromStore).toBe(usersMock);
    });
  });
});

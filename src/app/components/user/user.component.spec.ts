import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { User } from 'src/app/models/user.model';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userMock: User = {
    id: 7,
    email: 'michael.lawson@reqres.in',
    firstname: 'Michael',
    lastname: 'Lawson',
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = userMock;
    fixture.detectChanges();
  });

  it('Deberia instanciar el component', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia renderizar el nombre completo en h5.card-title', () => {
    const compiled = fixture.debugElement.query(By.css('h5.card-title'));
    const element: HTMLElement = compiled.nativeElement;
    const name = `${userMock.firstname} ${userMock.lastname}`;
    expect(element.textContent).toContain(name);
  });

  it('Deberia renderizar el email en p.card-text', () => {
    const compiled = fixture.debugElement.query(By.css('p.card-text'));
    const element: HTMLElement = compiled.nativeElement;
    expect(element.textContent).toContain(userMock.email);
  });

  it('Deberia asignar el atributo src con la imagen en img.card-img-top', () => {
    const compiled = fixture.debugElement.query(By.css('img.card-img-top'));
    const img: HTMLImageElement = compiled.nativeElement;
    expect(img.src).toBe(userMock.avatar);
  });

  it('Deberia llamarse selectUser cuando se da click en button.btn.btn-secondary', () => {
    const button = fixture.debugElement.query(
      By.css('button.btn.btn-secondary')
    );
    const selectUserSpy = jest.spyOn(component, 'selectUser');
    button.triggerEventHandler('click', null);
    expect(selectUserSpy).toHaveBeenCalled();
  });

  it('Deberia emitir onSelectUser cuando se llame selectUser', () => {
    const onSelectUserSpy = jest.spyOn(component.onSelectUser, 'emit');
    component.selectUser();
    expect(onSelectUserSpy).toHaveBeenCalledWith(component.user);
  });

  it('Deberia renderizar el email en p.card-text 2', () => {
    const compiled = fixture.debugElement.query(By.css('p.card-text'));
    const element: HTMLElement = compiled.nativeElement;
    component.user.email = 'john.doe@example.com';
    fixture.detectChanges();
    expect(element.textContent).toContain('john.doe@example.com');
  });
});

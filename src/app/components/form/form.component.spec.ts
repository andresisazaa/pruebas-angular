import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia instanciarse', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia ser invalido cuando el formulario esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('Validaciones campo firstname', () => {
    const firstnameControl = component.firstname;
    expect(firstnameControl.valid).toBeFalsy();

    firstnameControl.setValue('');
    expect(firstnameControl.hasError('required')).toBeTruthy();

    firstnameControl.setValue('J');
    expect(firstnameControl.hasError('minlength')).toEqual(true);

    firstnameControl.setValue('John');
    expect(firstnameControl.valid).toBe(true);
  });

  it('Validaciones campo lastname', () => {
    const lastnameControl = component.lastname;
    expect(lastnameControl.valid).toBeFalsy();

    lastnameControl.setValue('');
    expect(lastnameControl.hasError('required')).toBeTruthy();

    lastnameControl.setValue('D');
    expect(lastnameControl.hasError('minlength')).toEqual(true);

    lastnameControl.setValue('Doe');
    expect(lastnameControl.valid).toBe(true);
  });

  it('Validaciones campo email', () => {
    const emailControl = component.email;
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTruthy();

    emailControl.setValue('john@');
    expect(emailControl.hasError('email')).toEqual(true);

    emailControl.setValue('john@example');
    expect(emailControl.hasError('email')).toEqual(false);

    expect(emailControl.valid).toBe(true);
  });

  it('Deberia llamarse el submit cuando se da click en button.btn.btn-success', () => {
    const button = fixture.debugElement.query(By.css('button.btn.btn-success'));
    const submitSpy = jest.spyOn(component, 'submit');
    button.nativeElement.click();
    fixture.detectChanges();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('Deberia guardar los datos del formulario en userData', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
    component.firstname.setValue(user.firstname);
    component.lastname.setValue(user.lastname);
    component.email.setValue(user.email);
    component.submit();
    fixture.detectChanges();
    expect(component.formSubmitted).toEqual(true);
    expect(component.form.valid).toEqual(true);
    expect(component.userData.firstname).toEqual(user.firstname);
    expect(component.userData.lastname).toEqual(user.lastname);
    expect(component.userData.email).toEqual(user.email);
    expect(component.formMessage).toEqual('Formulario guardado correctamente');
  });

  it('Deberia indicar que el formulario no es válido', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@',
    };
    component.firstname.setValue(user.firstname);
    component.lastname.setValue(user.lastname);
    component.email.setValue(user.email);
    component.submit();
    expect(component.formSubmitted).toEqual(true);
    expect(component.form.invalid).toEqual(true);
    expect(component.formMessage).toEqual('Formulario no válido');
  });

  it('Deberia renderizar el mensaje cuando el formularo es válido', () => {
    const compiled = fixture.debugElement.query(By.css('p.font-weight-bolder'));
    const message: HTMLParagraphElement = compiled.nativeElement;
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
    component.firstname.setValue(user.firstname);
    component.lastname.setValue(user.lastname);
    component.email.setValue(user.email);
    component.submit();
    fixture.detectChanges();
    expect(message.textContent).toContain('Formulario guardado correctamente');
  });

  it('Deberia renderizar el mensaje cuando el formularo NO es válido', () => {
    const compiled = fixture.debugElement.query(By.css('p.font-weight-bolder'));
    const message: HTMLParagraphElement = compiled.nativeElement;
    component.submit();
    fixture.detectChanges();
    expect(message.textContent).toContain('Formulario no válido');
  });
});

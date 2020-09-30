import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form: FormGroup;
  userData: { firstname: string; lastname: string; email: string };
  formSubmitted: boolean;
  formMessage: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get firstname(): AbstractControl {
    return this.form.get('firstname');
  }

  get lastname(): AbstractControl {
    return this.form.get('lastname');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  submit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userData = this.form.value;
      this.formMessage = 'Formulario guardado correctamente';
    } else {
      this.formMessage = 'Formulario no válido';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { loginRequest } from '../model/login.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
     const isSubmitted = form && form.submitted;
     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
   }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin : FormGroup = this.formBuilder.group({});
  matcher = new  MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
  }

  login() : void {
    const username = this.formLogin.get("username")?.value;
    const password = this.formLogin.get("password")?.value;

    const data = {
      email : username,
      password : password
    } as loginRequest;

    console.log(data);
  }
}

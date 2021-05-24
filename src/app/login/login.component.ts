import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { loginRequest } from '../model/login.model';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';

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
  disabledButton = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dataService: DataService) {

    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.dataService.isLoading.subscribe(isLoading => {
      this.disabledButton = isLoading;
    });
  }


  ngOnInit(): void {
  }

  login(): void{
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;
    const data = {
      email: username,
      password: password
    } as loginRequest;

    // console.log(data); eve.holt@reqres.in

    this.dataService.isLoading.next(true);

    this.loginService.login(data).subscribe( (res) =>{
      console.log(res);
      this.dataService.isLoading.next(false);
      this.router.navigate(['home'])
    }, err => {
        console.log(err);
        this.dataService.isLoading.next(false);
        this.dataService.message.next(err.error.error);
        //alert(err.error.error);
      }
    );

  }
}

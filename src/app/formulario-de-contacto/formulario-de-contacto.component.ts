import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { formularioRequest } from '../model/formulario.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  selector: 'app-formulario-de-contacto',
  templateUrl: './formulario-de-contacto.component.html',
  styleUrls: ['./formulario-de-contacto.component.css']
})
export class FormularioDeContactoComponent implements OnInit {

  formContact : FormGroup =  this.formBuilder.group({});
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {
    this.formContact = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviarMensaje():void {
    const name = this.formContact.get("name")?.value;
    const email = this.formContact.get("email")?.value;
    const message = this.formContact.get("message")?.value;

    const data = {
      name:name,
      email:email,
      message:message
    } as formularioRequest;

    console.log(data);
  }
}

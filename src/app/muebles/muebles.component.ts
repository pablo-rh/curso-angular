import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Muebles } from '../model/muebles.models';
import { DataService } from '../services/data.service';
import { MueblesService } from '../services/muebles.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  selector: 'app-muebles',
  templateUrl: './muebles.component.html',
  styleUrls: ['./muebles.component.css']
})
export class MueblesComponent implements OnInit {

  formContact : FormGroup =  this.formBuilder.group({});
  matcher = new MyErrorStateMatcher();
  disableButton = false;
  id : string = '';
  title : string = "Crear elemento";


  constructor(
    private formBuilder: FormBuilder,
    private dataService : DataService,
    private router:Router,
    private muebles : MueblesService,
    private activatedRoute : ActivatedRoute) {
    this.formContact = this.formBuilder.group({
      tipoTela:['',[Validators.required] ],
      marca:['',[Validators.required] ],
      tipo:['',[Validators.required] ]
    });
    this.dataService.isLoading.subscribe(isLoading => {
       this.disableButton = isLoading
    })

    this.activatedRoute.params.subscribe(parameters => {
      if(parameters.id){
        this.id = parameters.id;
        this.title = "Actualizar elemento";

        this.muebles.getSingleMueble(this.id).subscribe(item => {
          this.formContact.get("tipoTela")?.setValue(item.tela),
          this.formContact.get("marca")?.setValue(item.marca),
          this.formContact.get("tipo")?.setValue(item.tipo)
        });
      }
    })
  }

  ngOnInit(): void {
  }

  save():void {
    const data = {
      tela: this.formContact.get("tipoTela")?.value,
      marca: this.formContact.get("marca")?.value,
      tipo: this.formContact.get("tipo")?.value
    } as Muebles;

    console.log(data);

    this.dataService.isLoading.next(true);

    this.muebles.saveMueble(data,this.id).subscribe( () => {
      this.router.navigate(['home']);
      this.dataService.isLoading.next(false);
    }, err => {
      this.dataService.message.next("Lo sentimos: Ocurrio un error generico");
      this.dataService.isLoading.next(false);
    });

  }

}

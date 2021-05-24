import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Muebles } from '../model/muebles.models';
import { DataService } from '../services/data.service';
import { MueblesService } from '../services/muebles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<Muebles>();
  columns = ['tela','marca','tipo','actions','delete'];


  constructor(private dataService:DataService,private muebles:MueblesService,private router:Router) {
    this.dataService.isLoading.next(true);
    this.muebles.getMueble().subscribe(muebles => {
      this.dataSource.data = muebles;
      this.dataService.isLoading.next(false);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next("Lo sentimos no se pudieron cargar los elementos ");
    });
  }

  edit(item: Muebles):void {
    console.log(item);
    this.router.navigate(['muebles',item._id]);
  }

  deleteElement(item:Muebles) : void {
    console.log(item);

    this.muebles.deleteMueble(item).subscribe( () => {
      this.router.navigate(['muebles']);
      this.dataService.isLoading.next(false);
    }, err => {
      this.dataService.message.next("Lo sentimos: Ocurrio un error generico");
      this.dataService.isLoading.next(false);
    });

/*
  this.muebles.saveMueble(data,this.id).subscribe( () => {
      this.router.navigate(['home']);
      this.dataService.isLoading.next(false);
    }, err => {
      this.dataService.message.next("Lo sentimos: Ocurrio un error generico");
      this.dataService.isLoading.next(false);
    });
*/


  }

  newItem():void {
    this.router.navigate(['muebles']);
  }

  ngOnInit(): void {
  }

}

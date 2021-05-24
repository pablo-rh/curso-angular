import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muebles } from '../model/muebles.models';

@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http:HttpClient) { }

  getMueble() : Observable<[Muebles]> {
    return this.http.get<[Muebles]>('https://super-rest.herokuapp.com/test/muebles');
  }

  getSingleMueble(id:string): Observable<Muebles> {
    return this.http.get<Muebles>('https://super-rest.herokuapp.com/test/muebles/' + id);
  }

  saveMueble(item: Muebles,id?:string) :Observable<any>{
    //update
    if(id !== '') {
      //metodo para actualizar
      return this.http.put('https://super-rest.herokuapp.com/test/muebles/'+id,item);
    }
    //metodo para crear
    return this.http.post('https://super-rest.herokuapp.com/test/muebles',item);
  }

  deleteMueble(item:Muebles):Observable<any> {
    return this.http.delete('https://super-rest.herokuapp.com/test/muebles/'+item._id);
  }


}

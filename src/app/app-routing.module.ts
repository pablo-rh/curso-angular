import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioDeContactoComponent } from './formulario-de-contacto/formulario-de-contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MueblesComponent } from './muebles/muebles.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"contact",
    component: FormularioDeContactoComponent
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"home/:item",
    component: HomeComponent
  },
  {
    path:"muebles",
    component: MueblesComponent
  },
  {
    path:"muebles/:id",
    component: MueblesComponent
  },
  {
    //poner inicio de la paginaraiz de la aplicacion web
    path: '**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

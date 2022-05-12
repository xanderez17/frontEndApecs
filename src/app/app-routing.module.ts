import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CuerpoComponent} from "./components/cuerpo/cuerpo.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'inicio', component:CuerpoComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

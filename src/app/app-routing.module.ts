import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CuerpoComponent} from "./components/cuerpo/cuerpo.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { ListarCursosComponent } from './components/dashboard/listar-cursos/listar-cursos.component';
import { CrearCursosComponent } from './components/dashboard/crear-cursos/crear-cursos.component';
import {ListarContratosComponent} from "./components/dashboard/listar-contratos/listar-contratos.component";


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'inicio', component:CuerpoComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},

  {path:'dashboard/crear-curso',component:CrearCursosComponent},
  {path:'dashboard/editar-cursos/:id',component:CrearCursosComponent},
  {path:'dashboard/listar-cursos',component:ListarCursosComponent},
  {path:'dashboard/listar-contratos',component:ListarContratosComponent},

  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

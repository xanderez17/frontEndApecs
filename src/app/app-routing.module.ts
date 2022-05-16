import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CuerpoComponent} from "./components/cuerpo/cuerpo.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { ListarCursosComponent } from './components/dashboard/curso/listar-cursos/listar-cursos.component';
import {ListarContratosComponent} from "./components/dashboard/contratos/listar-contratos/listar-contratos.component";
import { CrearCursoComponent } from './components/dashboard/curso/crear-curso/crear-curso.component';
import {CrearContratoComponent} from "./components/dashboard/contratos/crear-contrato/crear-contrato.component";
import { CrearParaleloComponent } from './components/dashboard/paralelo/crear-paralelo/crear-paralelo.component';
import { ListarParaleloComponent } from './components/dashboard/paralelo/listar-paralelo/listar-paralelo.component';
import { CrearInscripcionComponent } from './components/dashboard/crear-inscripcion/crear-inscripcion.component';


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'inicio', component:CuerpoComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},

  {path:'dashboard/crear-curso',component:CrearCursoComponent},
  {path:'dashboard/editar-cursos/:id',component:CrearCursoComponent},
  {path:'dashboard/listar-cursos',component:ListarCursosComponent},

  {path:'dashboard/listar-contratos',component:ListarContratosComponent},
  {path:'dashboard/crear-contrato',component:CrearContratoComponent},
  {path:'dashboard/editar-contrato/:id',component:CrearContratoComponent},

  {path:'dashboard/crear-paralelo',component:CrearParaleloComponent},
  {path:'dashboard/editar-paralelo/:id',component:CrearParaleloComponent},
  {path:'dashboard/listar-paralelos',component:ListarParaleloComponent},

  {path:'inscripcion',component:CrearInscripcionComponent},

  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

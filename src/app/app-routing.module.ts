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
import { CrearInscripcionComponent } from './components/dashboard/alumno/crear-inscripcion/crear-inscripcion.component';
import { ListarEstudiantesComponent } from './components/dashboard/alumno/listar-estudiantes/listar-estudiantes.component';
import { ListarAulasComponent } from './components/dashboard/aula/listar-aulas/listar-aulas.component';
import { CrearAulaComponent } from './components/dashboard/aula/crear-aula/crear-aula.component';
import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { CrearDocenteComponent } from './components/dashboard/docente/crear-docente/crear-docente.component';
import { ListarDocentesComponent } from './components/dashboard/docente/listar-docentes/listar-docentes.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'inicio', component:CuerpoComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},

  {path:'dashboard/crear-curso/:idC',component:CrearCursoComponent},
  {path:'dashboard/editar-cursos/:id',component:CrearCursoComponent},
  {path:'dashboard/listar-cursos',component:ListarCursosComponent},

  {path:'dashboard/listar-contratos',component:ListarContratosComponent},
  {path:'dashboard/crear-contrato',component:CrearContratoComponent},
  {path:'dashboard/editar-contrato/:id',component:CrearContratoComponent},

  {path:'dashboard/crear-aula',component:CrearAulaComponent},
  {path:'dashboard/editar-aula/:id',component:CrearAulaComponent},
  {path:'dashboard/listar-aulas',component:ListarAulasComponent},

  {path:'dashboard/crear-paralelo',component:CrearParaleloComponent},
  {path:'dashboard/editar-paralelo/:id',component:CrearParaleloComponent},
  {path:'dashboard/listar-paralelos',component:ListarParaleloComponent},

  {path:'inscripcion',component:CrearInscripcionComponent},
  {path:'dashboard/editar-alumno/:id',component:CrearInscripcionComponent},
  {path:'dashboard/listar-alumnos',component:ListarEstudiantesComponent},

  {path:'dashboard/crear-docente',component:CrearDocenteComponent},
  {path:'dashboard/editar-docente/:id',component:CrearDocenteComponent},
  {path:'dashboard/listar-docentes',component:ListarDocentesComponent},

  {path:'dashboard/crear-catalogo',component:CrearCatalogoComponent},
  {path:'dashboard/editar-catalogo/:id',component:CrearCatalogoComponent},
  {path:'dashboard/listar-catalogos',component:ListarCatalogoComponent},

  {path:'dashboard/crear-sucursal',component:CrearSucursalComponent},
  {path:'dashboard/editar-sucursal/:id',component:CrearSucursalComponent},
  {path:'dashboard/listar-sucursales',component:ListarSucursalComponent},


  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

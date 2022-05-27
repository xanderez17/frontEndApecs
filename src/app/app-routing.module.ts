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
import { ListarEstudiantesComponent } from './components/dashboard/alumno/listar-estudiantes/listar-estudiantes.component';
import { ListarAulasComponent } from './components/dashboard/aula/listar-aulas/listar-aulas.component';
import { CrearAulaComponent } from './components/dashboard/aula/crear-aula/crear-aula.component';
import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { CrearDocenteComponent } from './components/dashboard/docente/crear-docente/crear-docente.component';
import { ListarDocentesComponent } from './components/dashboard/docente/listar-docentes/listar-docentes.component';
import {CrearMatriculaComponent} from "./components/dashboard/matricula/crear-matricula/crear-matricula.component";
import {  ListarMatriculasComponent} from "./components/dashboard/matricula/listar-matriculas/listar-matriculas.component";

import { CrearHorariosComponent } from './components/dashboard/horario/crear-horarios/crear-horarios.component';
import { ListarHorariosComponent } from './components/dashboard/horario/listar-horarios/listar-horarios.component';
import { CrearRepresentanteComponent } from './components/dashboard/Representante/crear-representante/crear-representante.component';
import { ListarRepresentanteComponent } from './components/dashboard/Representante/listar-representante/listar-representante.component';
import { EditarRepresentanteComponent } from './components/dashboard/Representante/editar-representante/editar-representante.component';
import { CrearParentezcoComponent } from './components/dashboard/parentezco/crear-parentezco/crear-parentezco.component';
import { ListarParentezcoComponent } from './components/dashboard/parentezco/listar-parentezco/listar-parentezco.component';

import {HomeComponent} from "./components/home/home.component";
import { CrearInscripcionCursoComponent } from './components/dashboard/alumno/crear-inscripcion-curso/crear-inscripcion-curso.component';
import { ListarInscripcionComponent } from './components/dashboard/alumno/listar-inscripcion/listar-inscripcion.component';
import { CrearAlumnoComponent } from './components/dashboard/alumno/crear-alumno/crear-alumno.component';
import { CrearInscripcionComponent } from './components/dashboard/alumno/crear-inscripcion/crear-inscripcion.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},

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

  {path:'inscripcion/:id',component:CrearInscripcionComponent},
  {path:'dashboard/inscripcion-curso/:id',component:CrearInscripcionCursoComponent},
  {path:'dashboard/listar-inscripcion',component:ListarInscripcionComponent},

  {path:'dashboard/crear-alumno',component:CrearAlumnoComponent},
  {path:'dashboard/editar-alumno/:id',component:CrearAlumnoComponent},
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

  {path:'dashboard/crear-matricula',component:CrearMatriculaComponent},
  {path:'dashboard/editar-matricula/:id',component:CrearMatriculaComponent},
  {path:'dashboard/listar-matriculas',component:ListarMatriculasComponent},

  {path:'dashboard/crear-horario',component:CrearHorariosComponent},
  {path:'dashboard/editar-horario/:id',component:CrearHorariosComponent},
  {path:'dashboard/listar-horarios',component:ListarHorariosComponent},


  {path:'dashboard/crear-contrato/:idM',component:CrearContratoComponent},
  {path:'dashboard/editar-contrato/:id',component:CrearContratoComponent},
  {path:'dashboard/listar-contato',component:ListarContratosComponent},


  {path:'dashboard/crear-representante',component:EditarRepresentanteComponent},

  {path:'dashboard/editar-representante/',component:EditarRepresentanteComponent},
  {path:'dashboard/editar-representante/:id',component:EditarRepresentanteComponent},
  {path:'dashboard/listar-representantes',component:ListarRepresentanteComponent},



  {path:'dashboard/crear-parentezco',component:CrearParentezcoComponent},
  {path:'dashboard/editar-parentezco/:id',component:CrearParentezcoComponent},
  {path:'dashboard/listar-parentezco',component:ListarParentezcoComponent},

  {path: '**', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

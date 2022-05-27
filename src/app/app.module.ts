import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListarCursosComponent } from './components/dashboard/curso/listar-cursos/listar-cursos.component';
import { ListarContratosComponent } from './components/dashboard/contratos/listar-contratos/listar-contratos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearCursoComponent } from './components/dashboard/curso/crear-curso/crear-curso.component';
import { CrearContratoComponent } from './components/dashboard/contratos/crear-contrato/crear-contrato.component';
import { ListarParaleloComponent } from './components/dashboard/paralelo/listar-paralelo/listar-paralelo.component';
import { CrearParaleloComponent } from './components/dashboard/paralelo/crear-paralelo/crear-paralelo.component';
import { CrearDocenteComponent } from './components/dashboard/docente/crear-docente/crear-docente.component';
import { ListarDocentesComponent } from './components/dashboard/docente/listar-docentes/listar-docentes.component';
import { CrearInscripcionComponent } from './components/dashboard/alumno/crear-inscripcion/crear-inscripcion.component';
import { ListarEstudiantesComponent } from './components/dashboard/alumno/listar-estudiantes/listar-estudiantes.component';
import { CrearAulaComponent } from './components/dashboard/aula/crear-aula/crear-aula.component';
import { ListarAulasComponent } from './components/dashboard/aula/listar-aulas/listar-aulas.component';
import { CrearMatriculaComponent } from './components/dashboard/matricula/crear-matricula/crear-matricula.component';


import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { HeaderComponent } from './components/header/header.component';
import { ListarMatriculasComponent } from './components/dashboard/matricula/listar-matriculas/listar-matriculas.component';
import { CrearHorariosComponent } from './components/dashboard/horario/crear-horarios/crear-horarios.component';
import { ListarHorariosComponent } from './components/dashboard/horario/listar-horarios/listar-horarios.component';
import { ListarRepresentanteComponent } from './components/dashboard/Representante/listar-representante/listar-representante.component';
import { CrearRepresentanteComponent } from './components/dashboard/Representante/crear-representante/crear-representante.component';
import { EditarRepresentanteComponent } from './components/dashboard/Representante/editar-representante/editar-representante.component';
import { CrearParentezcoComponent } from './components/dashboard/parentezco/crear-parentezco/crear-parentezco.component';
import { ListarParentezcoComponent } from './components/dashboard/parentezco/listar-parentezco/listar-parentezco.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ListarInscripcionComponent } from './components/dashboard/alumno/listar-inscripcion/listar-inscripcion.component';
import { CrearInscripcionCursoComponent } from './components/dashboard/alumno/crear-inscripcion-curso/crear-inscripcion-curso.component';
import { CrearAlumnoComponent } from './components/dashboard/alumno/crear-alumno/crear-alumno.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    CuerpoComponent,
    LoginComponent,
    DashboardComponent,
    ListarCursosComponent,
    ListarContratosComponent,
    CrearCursoComponent,
    CrearParaleloComponent,
    ListarParaleloComponent,
    CrearContratoComponent,
    CrearInscripcionComponent,
    ListarEstudiantesComponent,
    ListarDocentesComponent,
    CrearDocenteComponent,
    CrearAulaComponent,
    ListarAulasComponent,
    CrearMatriculaComponent,
    CrearCatalogoComponent,
    ListarCatalogoComponent,
    ListarSucursalComponent,
    CrearSucursalComponent,
    HeaderComponent,
    ListarMatriculasComponent,
    CrearHorariosComponent,
    ListarHorariosComponent,
    ListarRepresentanteComponent,
    CrearRepresentanteComponent,
    EditarRepresentanteComponent,
    CrearParentezcoComponent,
    ListarParentezcoComponent,
    SidebarComponent,
    HomeComponent,
    CrearAlumnoComponent,
    CrearInscripcionCursoComponent,
    ListarInscripcionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    SharedModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

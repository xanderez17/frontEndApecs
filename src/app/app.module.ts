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
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
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
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {BodyComponent} from "./components/body/body.component";
import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    CuerpoComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
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
    SidenavComponent,
    BodyComponent,
    CrearCatalogoComponent,
    ListarCatalogoComponent,
    ListarSucursalComponent,
    CrearSucursalComponent,
    HeaderComponent
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
export class AppModule {}

import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-crear-inscripcion-curso',
  templateUrl: './crear-inscripcion-curso.component.html',
  styleUrls: ['./crear-inscripcion-curso.component.css'],
  providers: [DatePipe],
})
export class CrearInscripcionCursoComponent implements OnInit {
  fecha = new Date();
  public listaCurso!: MatTableDataSource<any>;

  numMatricula: any;
  lista = new Inscripcion();
  alumno = new Alumno();
  curso = new Curso();
  listaAlumnos: Alumno[] = [];
  listaMatriculas: Inscripcion[] = [];

  form!: FormGroup;
  idEdit!: string | null;

  displayedColumns: string[] = [
    'titulo',
    'categoria',
  
    'duracion',
    'docente',
    'fechaInicio',
   
    'estado',
    'acciones',
  ];

  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private alumnoServicio: AlumnoService,
    private cursoServicio: CursosService,
    private inscripcionServicio: InscripcionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private miDatePipe: DatePipe
  ) {
    this.form = this.fb.group({
    alumno:['',Validators.required],
    curso:['',Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });

    this.cargarListas();
    this.cargarDatos(Number(this.idEdit));

    this.cursoServicio.listar().subscribe((response) => {
      this.listaCurso = new MatTableDataSource(response);
      this.listaCurso.paginator = this.paginador;
      this.listaCurso.sort = this.marSort;
    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }

  cargarDatos(id: number) {
    if (!id) {
      return;
    }
    this.inscripcionServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }

  cargarListas() {
    this.alumnoServicio.listar().subscribe((p: any) => {
      this.listaAlumnos = p;
    });

 
    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaMatriculas = p;
      this.numMatricula = this.listaMatriculas.length;
    });
  }
  // filtrar
  filtrarCurso($event: any) {
    this.listaCurso.filter = $event.target.value;
  }

  //Filtrar Alumno
  filtrar($event: any) {
    this.alumno = new Alumno();

    for (let index = 0; index < this.listaAlumnos.length; index++) {
      if ($event.target.value == this.listaAlumnos[index].identificacion) {
        this.alumno = this.listaAlumnos[index];
      }
    }
  }
  seleccionarCurso(curso: any) {
    this.curso = curso;
  }
  agregar() {
    if (this.idEdit) {

      this.lista.alumno = this.alumno;
      this.lista.curso = this.curso;
      this.lista.fechaInscripcion = this.fecha
      this.inscripcionServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('insccripcion editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {

      this.lista.alumno = this.alumno;
      this.lista.curso = this.curso;
      this.lista.fechaInscripcion = this.fecha
      this.inscripcionServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Insccripcion creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

     
    }
  }




  irLista() {
    this.router.navigateByUrl('dashboard/listar-matriculas');
  }
}

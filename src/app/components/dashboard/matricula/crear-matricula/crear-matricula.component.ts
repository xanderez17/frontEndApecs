import { Component, OnInit, ViewChild } from '@angular/core';
import { Matricula } from '../../../../models/Matricula';
import { Alumno } from '../../../../models/Alumno';
import { Curso } from '../../../../models/Curso';
import { Paralelo } from '../../../../models/Paralelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../../../services/alumno.service';
import { CursosService } from '../../../../services/cursos.service';
import { ParaleloService } from '../../../../services/paralelo.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatriculaService } from '../../../../services/matricula.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-crear-matricula',
  templateUrl: './crear-matricula.component.html',
  styleUrls: ['./crear-matricula.component.css'],
  providers: [DatePipe],
})
export class CrearMatriculaComponent implements OnInit {


  public listaCurso!: MatTableDataSource<any>;

  numMatricula: any;
  lista = new Matricula();
  alumno = new Alumno();
  listaAlumnos: Alumno[] = [];
  listaParalelos: Paralelo[] = [];
  listaMatriculas: Matricula[] = [];

  form!: FormGroup;
  idEdit!: string | null;

  displayedColumns: string[] = [
    'titulo',

    'categoria',
    'docente',

    'duracion',
    'estado',
    'fechaInicio',

    'horario',
    'sucursal',



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
    private paraleloServicio: ParaleloService,
    private matriculaServicio: MatriculaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private miDatePipe: DatePipe
  ) {
    this.form = this.fb.group({
      fechaMatricula: ['', Validators.required],
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      paralelo: ['', Validators.required],
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
    this.matriculaServicio.getById(id).subscribe((ma) => {
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

    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });
    this.matriculaServicio.listar().subscribe((p: any) => {
      this.listaMatriculas = p;
      this.numMatricula = this.listaMatriculas.length;
    });
  }
  // filtrar
  filtrarCurso($event: any) {
    this.listaCurso.filter = $event.target.value;
  }


  //Filtrar Matrícula
  filtrar($event: any) {
    this.alumno = new Alumno();

    for (let index = 0; index < this.listaAlumnos.length; index++) {
      if ($event.target.value == this.listaAlumnos[index].identificacion) {
        this.alumno = this.listaAlumnos[index];

      }
      console.log(this.alumno)
    }



  }
  agregar() {

    if (this.idEdit) {
      const fecha = this.miDatePipe.transform(
        this.lista.fechaMatricula,
        'yyyy-MM-dd'
      );
      this.lista.fechaMatricula = fecha;

      this.matriculaServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Matricula editada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      const fecha = this.miDatePipe.transform(
        this.lista.fechaMatricula,
        'yyyy-MM-dd'
      );
      this.lista.fechaMatricula = fecha;
      this.lista.contrato = false;
      this.matriculaServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Matrícula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

      this.irLista();
    }
  }

  compareParalelo(x: Paralelo, y: Paralelo): boolean {
    return x && y ? x.idParalelo === y.idParalelo : x === y;
  }

  compareAlumno(x: Alumno, y: Alumno): boolean {
    return x && y ? x.id === y.id : x === y;
  }


  irLista() {

    this.router.navigateByUrl('dashboard/listar-matriculas');
  }
}

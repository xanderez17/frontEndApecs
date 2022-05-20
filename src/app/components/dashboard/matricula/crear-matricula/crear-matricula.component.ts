import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-crear-matricula',
  templateUrl: './crear-matricula.component.html',
  styleUrls: ['./crear-matricula.component.css'],
  providers: [DatePipe],
})
export class CrearMatriculaComponent implements OnInit {
  numMatricula: any;
  lista = new Matricula();

  listaAlumnos: Alumno[] = [];
  listaCursos: Curso[] = [];
  listaParalelos: Paralelo[] = [];
  listaMatriculas: Matricula[] = [];

  form!: FormGroup;
  idEdit!: string | null;

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });

    this.cargarListas();
    this.cargarDatos(Number(this.idEdit));
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
    this.cursoServicio.listar().subscribe((p: any) => {
      this.listaCursos = p;
    });
    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });
    this.matriculaServicio.listar().subscribe((p: any) => {
      this.listaMatriculas = p;
      this.numMatricula = this.listaMatriculas.length;
    });
  }

  agregar() {
    console.log(this.lista);
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
      this.lista.contrato=false;
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

  compareCurso(x: Curso, y: Curso): boolean {
    return x && y ? x.idCurso === y.idCurso : x === y;
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-matriculas');
  }
}

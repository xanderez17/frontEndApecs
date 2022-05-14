import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { Docente } from 'src/app/models/Docente';
import { Horario } from 'src/app/models/Horario';
import { Materia } from 'src/app/models/Materia';
import { Paralelo } from 'src/app/models/Paralelo';
import { CursosService } from 'src/app/services/cursos.service';
import { DocenteService } from 'src/app/services/docente.service';
import { HorarioService } from 'src/app/services/horario.service';
import { MateriaService } from 'src/app/services/materia.service';
import { ParaleloService } from 'src/app/services/paralelo.service';

@Component({
  selector: 'app-crear-cursos',
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.css'],
  providers: [DatePipe],
})
export class CrearCursosComponent implements OnInit {
  public formSubmitted = false;
  lista = new Curso();
  listaParalelos: Paralelo[] = [];
  listaMaterias: Materia[] = [];
  listaDocentes: Docente[] = [];
  listaHorarios: Horario[] = [];

  idEdit!: string | null;

  toppings = new FormControl();
  listam: string[] = [];
  form!: FormGroup;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cursoServicio: CursosService,
    private paraleloServicio: ParaleloService,
    private materiaServicio: MateriaService,
    private docenteServicio: DocenteService,
    private horarioservicio: HorarioService,
    private miDatePipe: DatePipe
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.cargarlistas();

    this.route.paramMap.subscribe((p: ParamMap) => {
      this.idEdit = p.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
  }

  cargarlistas() {
    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });

    this.materiaServicio.listar().subscribe((p: any) => {
      this.listaMaterias = p;
    });
    this.docenteServicio.listar().subscribe((p: any) => {
      this.listaDocentes = p;
    });
    this.horarioservicio.listar().subscribe((p: any) => {
      this.listaHorarios = p;
    });
  }

  validar() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      cupos: ['', Validators.required],
      seminarios: ['', Validators.required],
      duracion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      img: ['', Validators.required],
      pdf: ['', Validators.required],
    });
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();

      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  cargarDatos(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }
  agregar(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.idEdit) {
      this.cursoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Curso editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      const fechaInicio = this.miDatePipe.transform(
        this.lista.fechaInicio, "yyyy-MM-dd"  );
      this.lista.fechaInicio = fechaInicio;

      const fechaInscripcion = this.miDatePipe.transform(
        this.lista.fechaInscripcion, "yyyy-MM-dd"  );
      this.lista.fechaInicio = fechaInscripcion;

      const fechaFin = this.miDatePipe.transform(
        this.lista.fechaFin, "yyyy-MM-dd"  );
      this.lista.fechaFin = fechaFin;


      this.cursoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Curso creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

      this.irLista();
    }
  }

  irLista() {
    this.router.navigateByUrl('/dashboard/listar-cursos');
  }
}

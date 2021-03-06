import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Catalogo';
import { Curso } from 'src/app/models/Curso';
import { Docente } from 'src/app/models/Docente';
import { Horario } from 'src/app/models/Horario';
import { Paralelo } from 'src/app/models/Paralelo';
import { Sucursal } from 'src/app/models/Sucursal';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CursosService } from 'src/app/services/cursos.service';
import { DocenteService } from 'src/app/services/docente.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ParaleloService } from 'src/app/services/paralelo.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
  providers: [DatePipe],
})
export class CrearCursoComponent implements OnInit {
  lista = new Curso();

  listaDocentes: Docente[] = [];
  listaHorarios: Horario[] = [];
  listaSucursal: Sucursal[] = [];
  listaParalelos: Paralelo[] = [];

  catalogos = new Catalogo();
  idEdit!: string | null;

  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cursoServicio: CursosService,
    private paraleloServicio: ParaleloService,
    private catalogoServicio: CatalogoService,
    private docenteServicio: DocenteService,
    private horarioservicio: HorarioService,
    private sucursalesServicio: SucursalService,
    private miDatePipe: DatePipe
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.cargarlistas();

    this.route.params.subscribe(({ idC }) => this.getCatalogo(idC));

    this.route.paramMap.subscribe((p: ParamMap) => {
      this.idEdit = p.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
  }

  private getCatalogo(idC: number) {
    if (!idC) {
      return;
    }
    this.catalogoServicio.getById(idC).subscribe((x: any) => {
      this.catalogos = x;
    });
  }

  cargarlistas() {
    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });

    this.docenteServicio.listar().subscribe((p: any) => {
      this.listaDocentes = p;
    });
    this.horarioservicio.listar().subscribe((p: any) => {
      this.listaHorarios = p;
    });
    this.sucursalesServicio.listar().subscribe((p: any) => {
      this.listaSucursal = p;
    });
  }

  validar() {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      cupos: ['', Validators.required],
      descripcion: [''],
      docente: ['', Validators.required],
      duracion: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      horario: ['', Validators.required],
      modalidad: ['', Validators.required],
      seminarios: ['', Validators.required],
      titulo: [''],
      img: [''],
      estado: ['', Validators.required],
      valorMatricula: ['', Validators.required],
      valorCurso: ['', Validators.required],
      sucursal: ['', Validators.required],
      valorReserva:['',Validators.required],
      valorDescuento:['',Validators.required]
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
  agregar() {
    if (this.idEdit) {
      this.cursoServicio
      const fechaInicio = this.miDatePipe.transform(
        this.lista.fechaInicio,
        'yyyy-MM-dd'
      );
      this.lista.fechaInicio = fechaInicio;
      this.lista.titulo = this.catalogos.nombre;

      const fechaInscripcion = this.miDatePipe.transform(
        this.lista.fechaInscripcion,
        'yyyy-MM-dd'
      );
      this.lista.fechaInscripcion = fechaInscripcion;

      const fechaFin = this.miDatePipe.transform(
        this.lista.fechaFin,
        'yyyy-MM-dd'
      );
      this.lista.fechaFin = fechaFin;

       this.cursoServicio.editar(this.lista, Number(this.idEdit))
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
        this.lista.fechaInicio,
        'yyyy-MM-dd'
      );
      this.lista.fechaInicio = fechaInicio;

      const fechaInscripcion = this.miDatePipe.transform(
        this.lista.fechaInscripcion,
        'yyyy-MM-dd'
      );
      this.lista.fechaInscripcion = fechaInscripcion;

      const fechaFin = this.miDatePipe.transform(
        this.lista.fechaFin,
        'yyyy-MM-dd'
      );
      this.lista.fechaFin = fechaFin;
      this.lista.catalogo = this.catalogos;

      console.log(this.lista)

      this.lista.titulo = this.catalogos.nombre;
      this.cursoServicio.crear(this.lista).subscribe((m) => {

        this._snackBar.open('Curso creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

      });

      this.irLista();
    }
  }

  compareSucursal(x: Sucursal, y: Sucursal): boolean {
    return x && y ? x.idSucursal === y.idSucursal : x === y;
  }
  compareHorario(x: Horario, y: Horario): boolean {
    return x && y ? x.idHorario === y.idHorario : x === y;
  }
  compareDocente(x: Docente, y: Docente): boolean {
    return x && y ? x.id === y.id : x === y;
  }
  compareParalelo(x: Paralelo, y: Paralelo): boolean {
    return x && y ? x.idParalelo === y.idParalelo : x === y;
  }
  compareCatalogo(x: Catalogo, y: Catalogo): boolean {
    return x && y ? x.idCatalogo === y.idCatalogo : x === y;
  }

  irLista() {
    this.router.navigateByUrl('/dashboard/listar-cursos');
  }
}

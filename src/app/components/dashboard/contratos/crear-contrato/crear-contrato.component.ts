import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrato } from '../../../../models/Contrato';
import { Alumno } from '../../../../models/Alumno';
import { ContratoService } from '../../../../services/contrato.service';
import { AlumnoService } from '../../../../services/alumno.service';
import { DatePipe } from '@angular/common';
import { Representante } from '../../../../models/Representante';
import { RepresentanteService } from '../../../../services/representante.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { FormaPago } from 'src/app/models/FormaPago';
import { Matricula } from 'src/app/models/Matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import { CursosService } from 'src/app/services/cursos.service';
import { Curso } from 'src/app/models/Curso';
import { Parentezco } from 'src/app/models/Perentezco';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css'],
  providers: [DatePipe],
})
export class CrearContratoComponent implements OnInit {
  numContrato: any;
  lista = new Contrato();

  listaAlumnos: Alumno[] = [];
  listaCursos: Curso[] = [];
  listaContratos: Contrato[] = [];
  listaFormaPago: FormaPago[] = [];
  listaMatricula: Matricula[] = [];
  listaRepresentantes: Representante[] = [];

  formContrato!: FormGroup;
  idEdit!: string | null;

  constructor(
    private alumnoServicio: AlumnoService,
    private cursoServicio: CursosService,
    private contratoServicio: ContratoService,
    private matriculaServicio: MatriculaService,
    private formaPagoServicio: FormaPagoService,
    private representanteServicio: RepresentanteService,

    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private miDatePipe: DatePipe
  ) {
    this.formContrato = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      estado: ['', Validators.required],
      fechaContrato: ['', Validators.required],
      formaPago: ['', Validators.required],
      matricula: ['', Validators.required],
      observacion: ['', Validators.required],
      representante: ['', Validators.required],
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
    this.contratoServicio.getById(id).subscribe((ma) => {
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
    this.contratoServicio.listarContrato().subscribe((p: any) => {
      this.listaContratos = p;
      this.numContrato = this.listaContratos.length;
    });
    this.representanteServicio.listarRepresentante().subscribe((p: any) => {
      this.listaRepresentantes = p;
    });
    this.formaPagoServicio.listar().subscribe((p: any) => {
      this.listaFormaPago = p;
    });
    this.matriculaServicio.listar().subscribe((p: any) => {
      this.listaMatricula = p;
    });
    this.cursoServicio.listar().subscribe((p: any) => {
      this.listaCursos = p;
    });
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  agregar() {
    if (this.idEdit) {
      const fechaContrato = this.miDatePipe.transform(
        this.lista.fechaContrato,
        'yyyy-MM-dd'
      );
      this.lista.fechaContrato = fechaContrato;
      this.contratoServicio
        .editarContrato(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Contrato editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      const fechaContrato = this.miDatePipe.transform(
        this.lista.fechaContrato,
        'yyyy-MM-dd'
      );
      this.lista.fechaContrato = fechaContrato;
      this.contratoServicio.crearContrato(this.lista).subscribe((m) => {
        this._snackBar.open('Contrato creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

      this.irLista();
    }
  }
  compareAlumno(x: Alumno, y: Alumno): boolean {
    return x && y ? x.id === y.id : x === y;
  }
  compareRepresentante(x: Representante, y: Representante): boolean {
    return x && y ? x.id === y.id : x === y;
  }
  compareMatricula(x: Matricula, y: Matricula): boolean {
    return x && y ? x.idMatricula === y.idMatricula : x === y;
  }
  compareCurso(x: Curso, y: Curso): boolean {
    return x && y ? x.idCurso === y.idCurso : x === y;
  }
  compareFormaPago(x: FormaPago, y:FormaPago): boolean {
    return x && y ? x.idFormaPago === y.idFormaPago : x === y;
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-contratos');
  }
}

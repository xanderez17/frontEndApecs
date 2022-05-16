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
import {Representante} from "../../../../models/Representante";
import {RepresentanteService} from "../../../../services/representante.service";

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css'],
  providers: [DatePipe],
})
export class CrearContratoComponent implements OnInit {
  lista = new Contrato();

  listaAlumnos: Alumno[] = [];
  listaRepresentantes: Representante[] = [];

  formContrato!: FormGroup;
  idEdit!: string | null;

  constructor(
    private contratoServicio: ContratoService,
    private alumnoServicio: AlumnoService,
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
  }

  cargarListas() {
    this.alumnoServicio.listar().subscribe((p: any) => {
      this.listaAlumnos = p;
    });
    this.representanteServicio.listarRepresentante().subscribe((p:any)=>{
      this.listaRepresentantes=p;
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
    return x && y ? x.idPersona === y.idPersona : x === y;
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-contratos');
  }
}

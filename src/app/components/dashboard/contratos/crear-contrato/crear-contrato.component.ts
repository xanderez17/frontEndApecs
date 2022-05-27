import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrato } from '../../../../models/Contrato';
import { ContratoService } from '../../../../services/contrato.service';
import { DatePipe } from '@angular/common';
import { Representante } from '../../../../models/Representante';
import { Matricula } from 'src/app/models/Matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import { RepresentanteService } from 'src/app/services/representante.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearRepresentanteComponent } from '../../Representante/crear-representante/crear-representante.component';
import { Parentezco } from 'src/app/models/Perentezco';
import { ParentezcoService } from 'src/app/services/parentezco.service';
@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css'],
  providers: [DatePipe],
})
export class CrearContratoComponent implements OnInit {
  numContrato: any;
  lista = new Contrato();
  listaParentezco = new Parentezco();
  matricula = new Matricula();
  representante = new Representante();
  listaRepresentantes: Representante[] = [];
  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private contratoServicio: ContratoService,
    private matriculaServicio: MatriculaService,
    private parentezcoServicio: ParentezcoService,
    private representanteServicio: RepresentanteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private miDatePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ idM }) => this.getMatricula(idM));

    this.route.paramMap.subscribe((p: ParamMap) => {
      this.idEdit = p.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
    this.representanteServicio.listar().subscribe((p: any) => {
      this.listaRepresentantes = p;
    });
  }
  validar() {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      fechaContrato: ['', Validators.required],
      formaPago: ['', Validators.required],
      observacion: ['', Validators.required],
      parentezco: [''],
      Cursoduracion: [''],
      repreId: [''],
      repreApellido: [''],
      repreApellido2: [''],
      repreNombre: [''],
      alumnoId: [''],
      alumnoApellido: [''],
      alumnoApellido2: [''],
      alumnoNombre: [''],
      alumnoNombre2: [''],
      alumnoSexo: [''],
      alumnoFechaNa: [''],
      alumnoDir: [''],
      alumnoTelf: [''],
      alumnoCargo: [''],
      alumnoOcu: [''],
      cursoNombre: [''],
      cursoDes: [''],
      cursoDuracion: [''],
      cursoSeminarios: [''],
      cursoDias: [''],
      cursoHinicio: [''],
      cursoHfin: [''],
      cursoValorM: [''],
      cursoValorC: [''],
    });
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
  private getMatricula(idC: number) {
    if (!idC) {
      return;
    }
    this.matriculaServicio.getById(idC).subscribe((x: any) => {
      this.matricula = x;
    });
  }
  filtrarRepre($event: any) {
    this.representante = new Representante();
    for (let index = 0; index < this.listaRepresentantes.length; index++) {
      if (
        $event.target.value == this.listaRepresentantes[index].identificacion
      ) {
        this.representante = this.listaRepresentantes[index];
      }
    }
  }

  agregar() {
    if (this.idEdit) {
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
      this.listaParentezco.alumno = this.matricula.alumno;
      this.listaParentezco.representante = this.representante;
      this.parentezcoServicio.crear(this.listaParentezco);

     
      this.lista.matricula = this.matricula;
      this.lista.representante = this.representante;
      this.contratoServicio.crearContrato(this.lista).subscribe((m) => {
        this._snackBar.open('Contrato creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });

      this.irLista();
    }
  }
  openDialog() {
    this.dialog.open(CrearRepresentanteComponent);
  }
  compareRepresentante(x: Representante, y: Representante): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-contratos');
  }
}

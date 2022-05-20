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
@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css'],
  providers: [DatePipe],
})
export class CrearContratoComponent implements OnInit {
  numContrato: any;
  lista = new Contrato();

  matricula = new Matricula();
  representante = new Representante();
  listaRepresentantes: Representante[] = [];
  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private contratoServicio: ContratoService,
    private matriculaServicio: MatriculaService,
    private representanteServicio: RepresentanteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private miDatePipe: DatePipe
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ idM }) => this.getMatricula(idM));

    this.route.paramMap.subscribe((p: ParamMap) => {
      this.idEdit = p.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
  }
  validar() {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      fechaContrato: ['', Validators.required],
      formaPago: ['', Validators.required],
      observacion: ['', Validators.required],
    });
  }
  cargarDatos(id: number) {
    this.representanteServicio.listar().subscribe((p: any) => {
      this.listaRepresentantes = p;
    });
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
        console.log(this.representante);
      }
    }
  }

  agregar() {
    if (this.idEdit) {
      const fechaContrato = this.miDatePipe.transform(
        this.lista.fechaContrato,
        'yyyy-MM-dd'
      );
      this.lista.fechaContrato = fechaContrato;

      this.lista.alumno = this.matricula.alumno;
      this.lista.representante = this.representante;
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
      this.lista.matricula=this.matricula;
      
      this.lista.representante = this.representante;
console.log(this.lista);

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

  compareRepresentante(x: Representante, y: Representante): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-contratos');
  }
}

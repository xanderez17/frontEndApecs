import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.css'],
})
export class CrearInscripcionComponent implements OnInit {
  lista = new Alumno();
  listaCruso=new Curso();
  listaInscripsion=new Inscripcion();
   form!: FormGroup;
  idEdit: any;

  constructor(
    private cursoServicio: CursosService,
private alumnoServicio:AlumnoService,
private inscripcionServicio:InscripcionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      sexo: ['', Validators.required],
      ocupacion: ['', Validators.required],
      cargo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
      console.log(this.idEdit)
    });

    this.cargarCurso(Number(this.idEdit));

  }


  cargarCurso(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.listaCruso = m;
    });
  }

  

  agregar() {
    this.listaInscripsion.curso=this.listaCruso;
    this.listaInscripsion.cedula=this.lista.identificacion;
    this.inscripcionServicio.crear(this.listaInscripsion).subscribe((m) => {
      this._snackBar.open('', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.irLista();
    });
    this.alumnoServicio.crear(this.lista).subscribe((m) => {
      this._snackBar.open('Alumno creado!', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.irLista();
    });

    this.irLista();
  }

  irLista() {
    this.router.navigateByUrl('dashboard');
  }
}

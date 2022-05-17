import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.css'],
})
export class CrearInscripcionComponent implements OnInit {
  lista = new Alumno();
  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private alumnoServicio: AlumnoService,
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

   }



  agregar() {
    this.alumnoServicio.crear(this.lista).subscribe((m) => {
      this._snackBar.open('Curso creada!', '', {
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
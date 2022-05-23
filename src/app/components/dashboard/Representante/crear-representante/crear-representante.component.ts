import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Representante } from 'src/app/models/Representante';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css']
})
export class CrearRepresentanteComponent implements OnInit {
  lista = new Representante();
  form!: FormGroup;

 constructor(
   private servicio: RepresentanteService,
   private fb: FormBuilder,
   private router: Router,
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
   
   });
 }

 ngOnInit(): void {
 
 }





 agregar() {
  
   this.servicio.crear(this.lista).subscribe((m) => {
     this._snackBar.open('Representante creado!', '', {
       duration: 2500,
       horizontalPosition: 'center',
       verticalPosition: 'bottom',
     });
     this.irLista();
   });

   this.irLista();
 }

 irLista() {
   this.router.navigateByUrl('dashboard/listar-representante');
   location.reload()
 }
}

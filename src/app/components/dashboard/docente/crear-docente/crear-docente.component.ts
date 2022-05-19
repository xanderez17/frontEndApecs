import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Docente } from 'src/app/models/Docente';
import { Sucursal } from 'src/app/models/Sucursal';
import { DocenteService } from 'src/app/services/docente.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {
  lista = new Docente();
  
  listaSucursal: Sucursal[] = [];
  form!: FormGroup;
 idEdit: any;

 constructor(
   private servicio: DocenteService,
   private sucursalesServicio: SucursalService,
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
     especialidad: ['', Validators.required],
     curriculum: ['', Validators.required],
     
     sucursal: ['', Validators.required],
   });
 }

 ngOnInit(): void {
   this.route.paramMap.subscribe((params: ParamMap) => {
     this.idEdit = params.get('id');
     console.log(this.idEdit)
   });

   this.cargarAlumno();
   this.cargarlistas();
 }



 cargarAlumno() {
   if (!this.idEdit) {
     return;
   }
   this.servicio.getById(this.idEdit).subscribe((m) => {
     if (!m) {
       return this.irLista();
     }
     this.lista = m;
   });
 }
 cargarlistas() {
  
  this.sucursalesServicio.listar().subscribe((p: any) => {
    this.listaSucursal = p;
  });
}
 agregar() {
  if (this.idEdit) {
    this.servicio .editar(this.lista, Number(this.idEdit))
      .subscribe((ma) => {
        this._snackBar.open('Docente editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
      
  } else {
   this.servicio.crear(this.lista).subscribe((m) => {
     this._snackBar.open('Docente creado!', '', {
       duration: 2500,
       horizontalPosition: 'center',
       verticalPosition: 'bottom',
     });
     this.irLista();
   });

  
 }
}
 compareSucursal(x: Sucursal, y: Sucursal): boolean {
  return x && y ? x.idSucursal === y.idSucursal : x === y;
}
 irLista() {
   this.router.navigateByUrl('dashboard/listar-docentes');
  
 }
}

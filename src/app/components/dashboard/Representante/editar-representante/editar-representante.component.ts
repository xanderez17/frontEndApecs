import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Representante } from 'src/app/models/Representante';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  lista = new Representante();
    form!: FormGroup;
   idEdit: any;
  
   constructor(
     private servicio: RepresentanteService,
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
     
     });
   }
  
   ngOnInit(): void {
     this.route.paramMap.subscribe((params: ParamMap) => {
       this.idEdit = params.get('id');
       console.log(this.idEdit)
     });
  
     this.cargarRepresentante();
  
   }
  
  
   listarRepresentante() {
     this.servicio.listar().subscribe((p: any) => {
       this.lista = p;
     });
   }
  
   cargarRepresentante() {
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
  
   agregar() {
    if (this.idEdit) {
      this.servicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Catalogo editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } 
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
     this.router.navigateByUrl('dashboard/listar-representantes');
    
   }
  }
  
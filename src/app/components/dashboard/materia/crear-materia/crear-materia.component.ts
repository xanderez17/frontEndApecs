import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css']
})
export class CrearMateriaComponent implements OnInit {
  lista = new Materia();

  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private materiaService: MateriaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarID(Number(this.idEdit));
  }

  cargarID(id: number) {
    if (!id) {
      return;
    }
    this.materiaService.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }
  
  agregar() {
    if (this.idEdit) {
      this.materiaService
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Materia editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.materiaService.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Aula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

      this.irLista();
    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-materias');
  }
}

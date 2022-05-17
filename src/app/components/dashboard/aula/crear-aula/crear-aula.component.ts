import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Aula } from 'src/app/models/Aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-crear-aula',
  templateUrl: './crear-aula.component.html',
  styleUrls: ['./crear-aula.component.css'],
})
export class CrearAulaComponent implements OnInit {
  lista = new Aula();

  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private aulaServicio: AulaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', Validators.required],
      modalidad: ['', Validators.required],
      ubicacion: ['', Validators.required],
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
    this.aulaServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }
  compareAula(x: Aula, y: Aula): boolean {
    return x && y ? x.idAula === y.idAula : x === y;
  }
  agregar() {
    if (this.idEdit) {
      this.aulaServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Aula editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.aulaServicio.crear(this.lista).subscribe((m) => {
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
    this.router.navigateByUrl('dashboard/listar-aulas');
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-crear-cursos',
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.css'],
  providers: [DatePipe],
})
export class CrearCursosComponent implements OnInit {
  lista: Curso = new Curso();
  idEdit!: string | null;

  form: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cursoServicio: CursosService,
    public dialogRef: MatDialogRef<CrearCursosComponent>,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],

      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      cupos: ['', Validators.required],
      seminarios: ['', Validators.required],
      duracion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      img: ['', Validators.required],
      pdf: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };


  cargarDatos(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }
  agregar() {
    if (this.idEdit) {
      this.cursoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Curso editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.cursoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Curso creada!', '', {
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
    this.dialogRef.close();
  }
}

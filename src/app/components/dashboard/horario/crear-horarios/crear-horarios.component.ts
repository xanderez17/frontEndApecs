import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Horario } from 'src/app/models/Horario';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.component.html',
  styleUrls: ['./crear-horarios.component.css']
})
export class CrearHorariosComponent implements OnInit {

  lista = new Horario();

  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private servicio: HorarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      dias: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarHorario(Number(this.idEdit));
  }

  cargarHorario(id: number) {
    if (!id) {
      return;
    }
    this.servicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }

  agregar() {
    if (this.idEdit) {
      this.servicio .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Horario editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Horario creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
        location.reload();
      });

      this.irLista();
    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-horarios');
  }
}

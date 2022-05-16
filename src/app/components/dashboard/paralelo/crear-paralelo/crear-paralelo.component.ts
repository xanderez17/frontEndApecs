import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Aula } from 'src/app/models/Aula';
import { Paralelo } from 'src/app/models/Paralelo';
import { AulaService } from 'src/app/services/aula.service';
import { ParaleloService } from 'src/app/services/paralelo.service';

@Component({
  selector: 'app-crear-paralelo',
  templateUrl: './crear-paralelo.component.html',
  styleUrls: ['./crear-paralelo.component.css'],
})
export class CrearParaleloComponent implements OnInit {
  lista = new Paralelo();
  listaAulas: Aula[] = [];
  formParalelo!: FormGroup;
  idEdit!: string | null;

  constructor(
    private aulaServicio: AulaService,
    private paraleloServicio: ParaleloService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.formParalelo = this.fb.group({
      nombre: ['', Validators.required],
      aula: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.listarAulas();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarParalelo(Number(this.idEdit));

    this.listarAulas();


  }

  listarAulas() {
    this.aulaServicio.listar().subscribe((p: any) => {
      this.listaAulas = p;
    });
  }



  cargarParalelo(id: number) {
    if (!id) {
      return;
    }
    this.paraleloServicio.getById(id).subscribe((m) => {
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
      this.paraleloServicio
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
      this.paraleloServicio.crear(this.lista).subscribe((m) => {
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
    this.router.navigateByUrl('dashboard/listar-paralelos');
  }
}

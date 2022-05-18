import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css'],
})
export class CrearCatalogoComponent implements OnInit {
  lista = new Catalogo();

  form!: FormGroup;
  idEdit!: string | null;

  constructor(
    private catalogoServicio: CatalogoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      img: ['', Validators.required],
      pdf: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarCatalogo(Number(this.idEdit));
  }

  cargarCatalogo(id: number) {
    if (!id) {
      return;
    }
    this.catalogoServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }

  agregar() {
    if (this.idEdit) {
      this.catalogoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Catalogo editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.catalogoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Catalogo creada!', '', {
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
    this.router.navigateByUrl('dashboard/listar-catalogos');
  }
}

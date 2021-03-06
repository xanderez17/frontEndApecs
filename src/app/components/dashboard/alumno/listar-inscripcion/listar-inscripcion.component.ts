import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-inscripcion',
  templateUrl: './listar-inscripcion.component.html',
  styleUrls: ['./listar-inscripcion.component.css']
})
export class ListarInscripcionComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  //datos encabezado tablas
  displayedColumns: string[] = [
    'fecha',
    'cedula',
    'curso',
    'acciones'
  ];

  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [ 25,50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private servicio: InscripcionService, private router: Router) {}

  ngOnInit() {
    this.servicio.listar().subscribe((response) => {
      this.lista = new MatTableDataSource(response);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;
    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }
  // filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  //emininar
  eliminar(inscripcion: Inscripcion) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    console.log(this.lista);

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminarla  inscripcion?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(inscripcion.idInscripcion).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              ` ${inscripcion.idInscripcion} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
        location.reload();
      });
  }
}

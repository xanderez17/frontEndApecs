import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {DocenteService} from "../../../../services/docente.service";
import {Docente} from "../../../../models/Docente";

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css'],
})
export class ListarCursosComponent implements OnInit {

  public lista!: MatTableDataSource<any>;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'titulo',
    'descripcion',
    'categoria',
    'cupos',
    'duracion',
    'docente',
    'sucursal',
    'fechaInscripcion',
    'fechaInicio',
    'horario',
    'estado',
    'acciones',
  ];

  //Variable paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [ 25,50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private servicio: CursosService, private router: Router) {}

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
  // Filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  // Eliminar
  eliminar(curso: Curso) {
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
        text: `¿Seguro que quieres eliminar al curso ${curso.idCurso} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(curso.idCurso).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              ` ${curso.idCurso} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
        location.reload();
      });
  }
}

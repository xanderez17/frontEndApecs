import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from 'src/app/models/Horario';
import { HorarioService } from 'src/app/services/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-horario',
  templateUrl: './listar-horario.component.html',
  styleUrls: ['./listar-horario.component.css']
})
export class ListarHorarioComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
 horario:Horario[] = [];
  //datos encabezado tablas
  displayedColumns: string[] = [
    'horaInicio',

    'dias',
    'horaFin',
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

  constructor(private servicio: HorarioService) {}

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
  eliminar(horario: Horario) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminar ${horario.dias} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(horario.idHorario).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${horario.dias} ha  sido eliminado correctamente!`,
              'success'
            );
          });
        }
        location.reload();
      });
  }
}

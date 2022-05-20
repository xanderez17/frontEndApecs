import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatriculaService} from "../../../../services/matricula.service";
import Swal from "sweetalert2";
import {Matricula} from "../../../../models/Matricula";

@Component({
  selector: 'app-listar-matriculas',
  templateUrl: './listar-matriculas.component.html',
  styleUrls: ['./listar-matriculas.component.css']
})
export class ListarMatriculasComponent implements OnInit {
  public lista!: MatTableDataSource<any>;

  //Encabezados de Tabla
  displayedColumns: string[] = [
    'idMatricula',
    'fechaMatricula',
    'alumno',
    'curso',
    'paralelo',
    'contrato',
    'acciones'
  ];

  //Variables paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 25, 100];

  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, {static: true}) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private matriculaServicio:MatriculaService) {}

  ngOnInit(){
    this.matriculaServicio.listar().subscribe((response) => {
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

  //Filtrar Matrícula
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  //Eliminar Matrícula
  eliminar(matricula: Matricula) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: `¿Seguro que quieres eliminar la matrícula ${matricula.idMatricula} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.matriculaServicio.eliminar(matricula.idMatricula).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `La matrícula ${matricula.idMatricula} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
        location.reload();
      });
  }

}

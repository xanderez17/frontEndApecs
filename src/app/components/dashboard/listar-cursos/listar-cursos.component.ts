import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { CrearCursosComponent } from '../crear-cursos/crear-cursos.component';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  public lista!: MatTableDataSource<any>;
//datos encabezado tablas
  displayedColumns: string[] = ['titulo', 'descripcion','categoria','cupos','seminarios','fechaInscripcion','fechaInicio','fechaFin', 'acciones'];

  //varibel paginador
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private dialog:MatDialog,
    private cursoServicio: CursosService
    ) {
  }
openDialog(){
  this.dialog.open(CrearCursosComponent)
}
  ngOnInit() {

    this.cursoServicio.listar().subscribe((response) => {
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
  eliminar(curso: Curso) {
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
        text: `¿Seguro que quieres eliminar la materia ${curso.titulo} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.cursoServicio.eliminar(curso.idCurso).subscribe((resp) => {

            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `La materia ${curso.idCurso} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
      });
  }

}

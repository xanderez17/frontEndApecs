import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Catalogo } from 'src/app/models/Catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent implements OnInit {

  public lista!: MatTableDataSource<any>;
//datos encabezado tablas
  displayedColumns: string[] = ['nombre', 'descripcion','pdf','img','acciones'];

  //varibel paginador
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(

    private catalogoSservicio: CatalogoService
    ) {
  }

  ngOnInit() {

    this.catalogoSservicio.listar().subscribe((response) => {
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
  eliminar(catalogo: Catalogo) {
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
        text: `¿Seguro que quieres eliminar la materia ${catalogo.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.catalogoSservicio.eliminar(catalogo.idCatalogo).subscribe((resp) => {

            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `La materia ${catalogo.idCatalogo} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        } location.reload();
      });
  }

}

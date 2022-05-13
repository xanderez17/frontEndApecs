import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContratoService} from "../../../services/contrato.service";
import {Curso} from "../../../models/Curso";
import Swal from "sweetalert2";
import {Contrato} from "../../../models/Contrato";

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styleUrls: ['./listar-contratos.component.css']
})
export class ListarContratosComponent implements OnInit {

  public lista!: MatTableDataSource<any>;

  //Encabezados de Tabla
  displayedColumns: string[] = ['idContrato', 'estado', 'fechaContrato', 'observacion', 'acciones'];

  //Variables paginador
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 25, 100];

  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, {static: true}) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private contratoService: ContratoService) {
  }

  ngOnInit(): void {
    this.contratoService.listarContrato().subscribe((response) => {
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

  //Filtrar Contrato
  filtrar($event: any) {
    this.lista.filter = $event.target.value;

  }

  //Eliminar Contrato
  eliminar(contrato: Contrato) {
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
        text: `¿Seguro que quieres eliminar el contrato ${contrato.idContrato} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.contratoService.eliminarContrato(contrato.idContrato).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `La materia ${contrato.idContrato} ha  sido eliminado correctamente!`,
              'success'
            );
          });
        }
      });
  }
}

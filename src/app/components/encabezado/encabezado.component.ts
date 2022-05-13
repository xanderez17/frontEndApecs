import { Component, OnInit } from '@angular/core';
import {CrearCursosComponent} from "../dashboard/crear-cursos/crear-cursos.component";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }


}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Matricula } from '../models/Matricula';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  constructor(private http: HttpClient) {}
  //Obtener  por id
  getById(idMatricula: number): Observable<Matricula> {
    return this.http.get<Matricula>(
      `http://localhost:9898/api/matricula/listar-matricula/${idMatricula}`
    );
  }
  //Listar todo
  listar(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(
      `http://localhost:9898/api/matricula/listarMatriculas`
    );
  }
  //Crear Matricula
  crear(matricula: Matricula): Observable<Matricula> {
    return this.http
      .post<Matricula>(`http://localhost:9898/api/matricula/`, matricula)
      .pipe(
        map((response: any) => response.matricula as Matricula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar matricula
  editar(matricula: Matricula, idMatricula: number): Observable<Matricula> {
    return this.http
      .put<Matricula>(
        `http://localhost:9898/api/matricula/actualizarMatricula/${idMatricula}`,
        matricula
      )
      .pipe(
        map((response: any) => response.matricula as Matricula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar Matricula
  eliminar(id: number): Observable<Matricula> {
    return this.http
      .delete<Matricula>(
        `http://localhost:9898/api/matricula/elminarMatricula/${id}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}

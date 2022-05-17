import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormaPago } from '../models/FormaPago';

@Injectable({
  providedIn: 'root',
})
export class FormaPagoService {
  constructor(private http: HttpClient) { }
  //Obtener lista por id
  getById(idFormaPago: number): Observable<FormaPago> {
    return this.http.get<FormaPago>(
      `http://localhost:9898/api/formaPago/listar-formaPago/${idFormaPago}`
    );
  }
  //Lista todo
  listar(): Observable<FormaPago[]> {
    return this.http.get<FormaPago[]>(`http://localhost:9898/api/formaPago/listarFormaPagos`);
  }
  //Crear formaPago
  crear(formaPago: FormaPago): Observable<FormaPago> {
    return this.http
      .post<FormaPago>(`http://localhost:9898/api/formaPago/crearFormaPago`, formaPago)
      .pipe(
        map((response: any) => response.formaPago as FormaPago),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar formaPago
  editar(formaPago: FormaPago, idFormaPago: number): Observable<FormaPago> {
    return this.http
      .put<FormaPago>(
        `http://localhost:9898/api/formaPago/actualizarFormaPago/${idFormaPago}`,
        formaPago
      )
      .pipe(
        map((response: any) => response.formaPago as FormaPago),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar formaPago
  eliminar(id: number): Observable<FormaPago> {
    return this.http
      .delete<FormaPago>(`http://localhost:9898/api/formaPAgo/elminarFormaPago/${id}`)
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}

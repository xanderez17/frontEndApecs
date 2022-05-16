import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Alumno} from "../models/Alumno";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";
import {Representante} from "../models/Representante";

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  constructor(private httpClient: HttpClient) {
  }

  //Crear Representante
  crearRepresentante(representante: Representante): Observable<Representante> {
    return this.httpClient.post<Representante>(`http://localhost:9898/api/representantes/crearRepresentante`, representante).pipe(
      map((response: any) => response.representante as Representante),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Editar Representante
  editarRepresentante(representante: Representante, id: number): Observable<Representante> {
    return this.httpClient.put<Representante>(`http://localhost:9898/api/representantes/actualizarRepresentante/${id}`, representante).pipe(
      map((response: any) => response.representante as Representante),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Eliminar Representante
  eliminarRepresentante(id: number): Observable<Representante> {
    return this.httpClient.delete<Representante>(`http://localhost:9898/api/representantes/eliminarRepresentante/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Listar Representantes
  listarRepresentante(): Observable<Representante[]> {
    return this.httpClient.get<Representante[]>(`http://localhost:9898/api/representantes/listarRepresentantes`);
  }
}

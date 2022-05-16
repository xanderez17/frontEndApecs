import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {}
  //Obtener paralelo por id
  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`http://localhost:9898/api/alumno/listar-alumno/${id}`);
  }
 //Ccrear alumno
 crear(alumno: Alumno): Observable<Alumno> {
  return this.http.post<Alumno>(`http://localhost:9898/api/alumno/`, alumno).pipe(
    map((response: any) => response.alumno as Alumno),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

//Editar alumno
editar(alumno: Alumno, idAlumno: number): Observable<Alumno> {
  return this.http.put<Alumno>(`http://localhost:9898/api/alumno/actualizarAlumno/${idAlumno}`, alumno).pipe(
    map((response: any) => response.alumno as Alumno),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
//Eeliminar alumno
eliminar(id: number): Observable<Alumno> {
  return this.http.delete<Alumno>(`http://localhost:9898/api/alumno/eliminarAlumno/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
  //Lista alumnp
  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`http://localhost:9898/api/alumno/listarAlumnos`);
  }

}

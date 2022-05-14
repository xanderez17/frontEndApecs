import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Horario } from '../models/Horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
constructor(private http:HttpClient){

}
    //Listar todo
    listar(): Observable<Horario[]> {
      return this.http.get<Horario[]>(`http://localhost:9898/api/horario/listarHorarios`);
    }

  //Obtener lista por id
  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`http://localhost:9898/api/horario/listar-horario/${id}`);
  }
//Crear  nuevo 
crear(horario: Horario): Observable<Horario> {
  return this.http.post<Horario>(`http://localhost:9898/api/horario/`, horario).pipe(
    map((response: any) => response.horario as Horario),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

//Editar 
editar(horario: Horario, idHorario: number): Observable<Horario> {
  return this.http.put<Horario>(`http://localhost:9898/api/horario/actualizarHorario/${idHorario}`, horario).pipe(
    map((response: any) => response.horario as Horario),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
//Eeliminar por id
eliminar(id: number): Observable<Horario> {
  return this.http.delete<Horario>(`http://localhost:9898/api/horario/eliminarHorario/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

}


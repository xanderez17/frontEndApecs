import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listar():Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:9898/api/usuarios/listarUsuarios');
  }
}

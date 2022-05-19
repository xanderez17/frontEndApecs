import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any[] = [
    
    {
      titulo: 'Gestión de Cursos ',
      
      submenu: [
        {
          titulo: 'Crear Curso',
         
          url: 'crear-curso',
        },
        {
          titulo: 'Listar curso',
       
          url: 'listar-cursos',
        }
      ]
    }];
}

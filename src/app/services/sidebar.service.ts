import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}

  menu: any[] = [
    {
      titulo: 'Gestión de Cursos ',
      submenu: [
        {
          titulo: 'Crear Catalogo',
          url: 'crear-catalogo',
        },
        {
          titulo: 'Ver Catalogos',
          url: 'listar-catalogos',
        },
        {
          titulo: 'Listar curso',
          url: 'listar-cursos',
        },
      ],
    },
    {
      titulo: 'Gestión de Contratos ',
      submenu: [
        {
          titulo: 'Crear matriculas',
          url: 'crear-matricula',
        },
        {
          titulo: 'Ver Matriculas',
          url: 'listar-matriculas',
        },

        {
          titulo: 'Ver Contratos',
          url: 'listar-contratos',
        }

      ]
    },
    {
      titulo: 'Gestión de Personas ',
      submenu: [
        {
          titulo: 'Crear Alumno',
          url: 'inscripcion',
        },
        {
          titulo: 'Ver Alumnos',
          url: 'listar-alumnos',
        },
        {
          titulo: 'Crear Docentes',
          url: 'crear-docente',
        },
        {
          titulo: 'Ver Docentes',
          url: 'listar-docentes',
        },  {
          titulo: 'Crear Representante',
          url: 'editar-representante',
        },
        {
          titulo: 'Ver Represententes',
          url: 'listar-representantes',
        },
      ],
    },



  ];
}

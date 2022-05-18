import { Docente } from './Docente';
import { Horario } from './Horario';
import { Materia } from './Materia';
import { Paralelo } from './Paralelo';
import {Catalogo} from "./Catalogo";
import {Sucursal} from "./Sucursal";

export class Curso {
  idCurso: any;
  
  categoria: any;
  catalogo: Catalogo = new Catalogo();
  docente: Docente = new Docente();
  cupos: any;
  descripcion: any;
  duracion: any;
  estado: any;
  fechaInicio: any;
  fechaFin: any;
  fechaInscripcion: any;

  seminarios: any;
  horario: Horario= new Horario();
  sucursal: Sucursal = new Sucursal();
 
  titulo: any;
  valorCurso: any;
  valorMatricula: any;

}

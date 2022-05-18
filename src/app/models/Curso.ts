import { Docente } from './Docente';
import { Horario } from './Horario';
import { Materia } from './Materia';
import { Paralelo } from './Paralelo';
import {Catalogo} from "./Catalogo";
import {Sucursal} from "./Sucursal";

export class Curso {
  idCurso: any;
  valorCurso: any;
  valorMatricula: any;
  categoria: any;
  cupos: any;
  descripcion: any;
  duracion: any;
  estado: any;
  fechaInicio: any;
  fechaFin: any;
  fechaInscripcion: any;
  seminarios: any;
  titulo: any;
  catalogo: Catalogo = new Catalogo();
  docente: Docente = new Docente();
  horario: Horario= new Horario();
  sucursal: Sucursal = new Sucursal();


}

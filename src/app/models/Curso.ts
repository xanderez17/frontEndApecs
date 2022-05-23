import { Docente } from './Docente';
import { Horario } from './Horario';
import {Catalogo} from "./Catalogo";
import {Sucursal} from "./Sucursal";

export class Curso {
  idCurso: any;
  categoria: any;
  catalogo: Catalogo = new Catalogo();
  docente: Docente = new Docente();
  cupos: any;
  estado: any;
  fechaInicio: any;
  fechaFin: any;
  fechaInscripcion: any;
  modalidad: any;
  seminarios: any;
  horario: Horario= new Horario();
  sucursal: Sucursal = new Sucursal();
  valorCurso: any;
  valorMatricula: any;

}

import {Alumno} from "./Alumno";
import {Curso} from "./Curso";

export class Asistencia{
  idAsistencia: any;
  fechaAsistencia: any;
  alumno: Alumno = new Alumno();
  curso: Curso = new Curso();
}

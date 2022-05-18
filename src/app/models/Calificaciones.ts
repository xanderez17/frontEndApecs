import {Alumno} from "./Alumno";
import {Curso} from "./Curso";

export class Calificaciones{
  idCalificacion: any;
  observaciones: any;
  valorCalificacion: any;
  alumno: Alumno = new Alumno();
  curso: Curso = new Curso();
}

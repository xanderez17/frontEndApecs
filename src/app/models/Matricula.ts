import {Alumno} from "./Alumno";
import {Curso} from "./Curso";
import {Paralelo} from "./Paralelo";

export class Matricula{
  idMatricula:any;
  fechaMatricula: any;
  alumno: Alumno = new Alumno();
  curso: Curso = new Curso();
  paralelo: Paralelo = new Paralelo();
  contrato!:boolean;
}

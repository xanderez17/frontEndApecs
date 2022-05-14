import { Docente } from './Docente';
import { Horario } from './Horario';
import { Materia } from './Materia';
import { Paralelo } from './Paralelo';

export class Curso {
  idCurso: any;
  titulo: any;
  descripcion: any;
  categoria: any;
  cupos: any;
  seminarios: any;
  duracion: any;
  fechaInicio: any;
  fechaFin: any;
  fechaInscripcion: any;
  img: any;
  pdf: any;
  docente: Docente = new Docente();
  materia: Materia = new Materia();
  paralelo: Paralelo = new Paralelo();
  horario: Horario= new Horario();
}

import { Alumno } from './Alumno';
import { Curso } from './Curso';
import { FormaPago } from './FormaPago';
import { Matricula } from './Matricula';
import { Representante } from './Representante';
export class Contrato {
  idContrato: any;
  fechaContrato: any;
  observacion: any;
  estado: any;
  alumno: Alumno = new Alumno();
  representante: Representante = new Representante();
  curso: Curso = new Curso();
  formaPago: FormaPago = new FormaPago();
  matricula: Matricula = new Matricula();
}

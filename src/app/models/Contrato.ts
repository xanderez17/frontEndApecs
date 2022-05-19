import { Alumno } from './Alumno';
import { Curso } from './Curso';
import { FormaPago } from './FormaPago';
import { Matricula } from './Matricula';
import { Representante } from './Representante';
export class Contrato {
  alumno: Alumno = new Alumno();
  idContrato: any;
  estado: any;
  fechaContrato: any;
  formaPago: FormaPago = new FormaPago();
  matricula: Matricula = new Matricula();
  observacion: any;
  representante: Representante = new Representante();
}

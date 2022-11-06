import { AppModel } from '../app/app.model';

export class Debt extends AppModel {
  id: number;
  tipo: string = '';
  fecha: string = '';
  descripcion: string = '';
  deuda: number = 0;
  saldo: number = 0;
  checked?: boolean = false;
  detalle?: any = [];

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}

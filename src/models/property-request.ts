import { AppModel } from '../app/app.model';

export class PropertyRequest extends AppModel {
  idComunidad: string;
  idAdministrador: string;
  idInmueble: string;
  anio?: number;
  mes?: number;
  fecha?: string;
  token?: string;
  periodo?: string;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}

import { AppModel } from '../app/app.model';

export class Credit extends AppModel {
  abono: number = 0;
  detalle?: any = [];
}

export class KhipuTransaction extends AppModel {
  payment_id: string;
  payment_url: string;
  simplified_transfer_url: string;
  transfer_url: string;
  app_url: string;
  ready_for_terminal: boolean;
}

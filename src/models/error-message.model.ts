import { AppModel } from '../app/app.model';

export class ErrorMessageModel extends AppModel {
  showMessage: boolean;
  statusCode: number;
  name: string;
  message: string;
  icon?: string;
}

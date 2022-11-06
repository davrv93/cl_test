import { AppModel } from '../app/app.model';

export class UserModel extends AppModel {
  realm?: string;
  emailVerified?: boolean;
  name: string;
  lastName: string;
  motherLastName: string;
  idUserTcel?: string;
  username: string;
  password?: string;
  email: string;
  userId: string;
}

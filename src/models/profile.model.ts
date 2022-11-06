import { AppModel } from '../app/app.model';

export class ProfileModel extends AppModel {
  userId: string;
  token: string;
  emailVerified: boolean;
  provider: string;
  picture: string;
  userName: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  motherLastName: string;
  roles?: Array<Roles>;
}

export class Roles extends AppModel {
  id?: number;
  principalType?: number;
  principalId: number;
  roleId: number;
  role: Role;
}

export class Role extends AppModel {
  id: number;
  name: string;
  description?: string;
  created?: Date;
  modified?: Date;
}

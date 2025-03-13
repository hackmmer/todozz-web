import { merge } from 'lodash';
import { IWorkspace } from './todo';

export interface IUser {
  _id?: string;
  profile_image?: string;
  name: string;
  username: string;
  password: string;
  workspaces?: IWorkspace[];
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserSession {
  session: string;
  user: IUser;
}

export class User implements IUser {
  _id!: string;
  profile_image?: string;
  name!: string;
  username!: string;
  password!: string;
  workspaces: IWorkspace[] = [];

  constructor(options?: any) {
    merge(this, this._getDefaults(), options);
  }

  private _getDefaults(): IUser {
    return {
      _id: '',
      profile_image: '',
      name: '',
      username: '',
      password: '',
      workspaces: [],
    };
  }
}

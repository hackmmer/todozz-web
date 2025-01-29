import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser = {
    name: "Blizz",
    workspaces: ["asd-123", "asd-456"]
  };

  constructor(private _todoService: TodoService) { }

  getUser() {
    return this.user;
  }

  getUserWorkspaces() {
    return this.user.workspaces.map((t: string) => this._todoService.getWorkspace(t)).filter(e => !!e);
  }

}

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ITodo, IWorkspace } from '../interfaces/todo';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private _userService: UserService, @Inject(PLATFORM_ID) private platformId: Object) { }

  getWorkspaces() {
    if (isPlatformBrowser(this.platformId)) {
      const workspaces: Subject<IWorkspace[]> = new Subject();
      this._userService.getUser().subscribe((e) => {
        const u = new User(e);
        workspaces.next(u.workspaces);
      });
      return workspaces.asObservable();
    }
    return null;
  }

  createTodo(workspace: string, todo: ITodo) {
    this.getWorkspaces()?.subscribe((w) => {
      w.find((e) => e.token === workspace)?.todos.push(todo);
    });
  }
}

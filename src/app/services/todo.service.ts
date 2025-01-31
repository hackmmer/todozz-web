import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ITodo, IWorkspace } from '../interfaces/todo';
import { UserService } from './user.service';
import { Subject, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private _userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _http: HttpClient
  ) {}

  getWorkspaces() {
    if (!isPlatformBrowser(this.platformId)) return null;
    const workspaces: Subject<IWorkspace[]> = new Subject();
    this._userService.getUser().subscribe((e) => {
      console.log(e);
      workspaces.next(e.workspaces ?? []);
    });
    return workspaces.asObservable();
  }

  createTodo(workspace: string, todo: ITodo) {
    this.getWorkspaces()?.subscribe((w) => {
      w.find((e) => e.token === workspace)?.todos.push(todo);
    });
  }

  createWorkspace(w: IWorkspace) {
    let headers: HttpHeaders = new HttpHeaders();
    const session = sessionStorage.getItem('Session');
    if (session) headers = headers.set('Authorization', `Bearer ${session}`);
    return this._http
      .post<IWorkspace>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/workspace`,
        w,
        {
          headers,
        }
      )
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }
}

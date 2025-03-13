import { Injectable } from '@angular/core';
import { IUser, IUserLogin, IUserSession, User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { StorageService } from './storage.service';
import { IErrorResponse } from '../interfaces/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  login(payload: IUserLogin) {
    return this._http
      .post<IUserSession>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/auth/login`,
        payload
      )
      .pipe(
        tap((response) => {
          this._storageService.setSession(response.session);
          this._storageService.setItems({ _id: response.user._id });
        })
      );
    // .pipe(
    //   tap()
    // );
  }

  logout() {
    let headers: HttpHeaders = new HttpHeaders();
    const session = this._storageService.getSession();
    if (session) headers = headers.set('Authorization', `Bearer ${session}`);
    return this._http
      .post<boolean>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/auth/logout`,
        '',
        { headers }
      )
      .pipe(
        tap((e) => {
          this._storageService.clear();
        })
      );
  }

  isLogedIn() {
    return !!this._storageService.getSession();
  }

  register(payload: IUser) {
    return this._http
      .post<IUserSession>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/auth/register`,
        payload
      )
      .pipe(
        tap((response: IUserSession | IErrorResponse) => {
          // TODO implementar aqui manejo de errores
          // debe abrir un snackbar o dar alguna notificacion
          // la cual debe venir con el mensaje de error
          if ('error' in response)
            return;
          this._storageService.setSession(response.session);
          this._storageService.setItems({ _id: response.user._id });
        })
      );
  }

  getUser() {
    let headers: HttpHeaders = new HttpHeaders();
    const session = this._storageService.getSession();
    if (session) headers = headers.set('Authorization', `Bearer ${session}`);
    return this._http.get<IUser>(
      `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
        environment.api.port
      }/${environment.api.endpoint}/users`,
      {
        headers,
      }
    );
  }
}

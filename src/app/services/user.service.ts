import { Injectable } from '@angular/core';
import { IUser, IUserLogin, IUserSession, User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

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
          console.log(response);
          sessionStorage.setItem('Session', response.session);
          sessionStorage.setItem('_id', response.user._id);
        })
      );
    // .pipe(
    //   tap()
    // );
  }

  logout() {
    let headers: HttpHeaders = new HttpHeaders();
    const session = sessionStorage.getItem('Session');
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
          sessionStorage.clear();
        })
      );
  }

  isLogedIn() {
    return !!sessionStorage?.getItem('Session');;
  }

  register(payload: IUser) {
    this._http
      .post<IUserSession>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/auth/register`,
        payload
      )
      .pipe(
        tap((e: IUserSession) => {
          sessionStorage.setItem('Session', e.session);
          sessionStorage.setItem('_id', e.user._id);
        })
      );
  }

  getUser() {
    let headers: HttpHeaders = new HttpHeaders();
    const session = sessionStorage.getItem('Session');
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

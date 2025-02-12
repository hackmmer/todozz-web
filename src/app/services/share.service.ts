import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IShareResp } from '../interfaces/http';
import { IWorkspace } from '../interfaces/todo';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) { }

  createLinkFor(w: IWorkspace) {
    let headers: HttpHeaders = new HttpHeaders();
    const session = this._storageService.getSession();
    if (session) headers = headers.set('Authorization', `Bearer ${session}`);
    return this._http
      .post<IShareResp>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/share`,
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

  getItemFrom(k: string) {
    let headers: HttpHeaders = new HttpHeaders();
    const session = this._storageService.getSession();
    if (session) headers = headers.set('Authorization', `Bearer ${session}`);
    return this._http
      .get<IWorkspace>(
        `${environment.api.ssl ? 'https' : 'http'}://${environment.api.url}:${
          environment.api.port
        }/${environment.api.endpoint}/share/${k}`,
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

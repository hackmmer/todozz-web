import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ThemeEnum } from '../enums/storage';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly cookiesConfig: CookieOptions = {
    secure: true,
    sameSite: 'Strict',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookieService
  ) {}

  getTheme() {
    if (!isPlatformBrowser(this.platformId)) return null;
    return this.getItem('theme');
  }

  setTheme(theme: ThemeEnum) {
    if (!isPlatformBrowser(this.platformId)) return null;
    return this.setItem('theme', theme.toString());
  }

  getSession() {
    if (!isPlatformBrowser(this.platformId)) return null;
    return this.getItem('Session');
  }

  setSession(session: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.setItem('Session', session);
  }

  setItem(key: string, value: string) {
    this.cookies.set(key, value, this.cookiesConfig);
  }

  setItems(obj: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    Object.keys(obj).forEach((e) => {
      this.setItem(e, obj[e]);
    });
  }

  getItem(key: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    return this.cookies.get(key);
  }

  clear() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.cookies.deleteAll();
  }
}

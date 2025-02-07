import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ThemeEnum } from '../enums/storage';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getTheme() {
    if (!isPlatformBrowser(this.platformId)) return null;
    return sessionStorage.getItem('theme');
  }

  setTheme(theme: ThemeEnum) {
    if (!isPlatformBrowser(this.platformId)) return null;
    return sessionStorage.setItem('theme', theme.toString());
  }

  getSession() {
    if (!isPlatformBrowser(this.platformId)) return null;
    return sessionStorage.getItem('Session');
  }

  setSession(session: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    sessionStorage.setItem('Session', session);
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  setItems(obj: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    Object.keys(obj).forEach((e) => {
      sessionStorage.setItem(e, obj[e]);
    });
  }

  getItem(key: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    sessionStorage.getItem(key);
  }

  clear() {
    if (!isPlatformBrowser(this.platformId)) return;
    sessionStorage.clear();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { UserService } from './user.service';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { StorageService } from './storage.service';
import { ShareService } from './share.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [CommonModule],
  providers: [
    TodoService,
    UserService,
    StorageService,
    ShareService,

    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    CookieService,
  ],
})
export class ServicesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { UserService } from './user.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  providers: [TodoService, UserService, provideHttpClient(withInterceptorsFromDi(), withFetch())],
})
export class ServicesModule {}

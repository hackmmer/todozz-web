import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { UserService } from './user.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TodoService,
    UserService
  ]
})
export class ServicesModule { }

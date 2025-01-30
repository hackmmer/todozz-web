import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTodoComponent } from './todos/manage-todo/manage-todo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../components/components.module";
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [ManageTodoComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
],
  exports: [ManageTodoComponent, AuthComponent],
})
export class ModalsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTodoComponent } from './todos/manage-todo/manage-todo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [ManageTodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
],
  exports: [ManageTodoComponent],
})
export class ModalsModule {}

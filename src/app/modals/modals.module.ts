import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTodoComponent } from './todos/manage-todo/manage-todo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../components/components.module";
import { AuthComponent } from './auth/auth.component';
import { ManageWorkspaceComponent } from './manage-workspace/manage-workspace.component';

@NgModule({
  declarations: [ManageTodoComponent, AuthComponent, ManageWorkspaceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
],
  exports: [ManageTodoComponent, AuthComponent, ManageWorkspaceComponent],
})
export class ModalsModule {}

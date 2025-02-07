import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTodoComponent } from './todos/manage-todo/manage-todo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../components/components.module";
import { AuthComponent } from './auth/auth.component';
import { ManageWorkspaceComponent } from './workspaces/manage-workspace/manage-workspace.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';

@NgModule({
  declarations: [ManageTodoComponent, AuthComponent, ManageWorkspaceComponent, DeleteItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
],
  exports: [ManageTodoComponent, AuthComponent, ManageWorkspaceComponent, DeleteItemComponent],
})
export class ModalsModule {}

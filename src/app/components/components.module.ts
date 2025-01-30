import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserImgComponent } from './user-img/user-img.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconComponent } from './icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    NavBarComponent,
    UserImgComponent,
    TodoItemComponent,
    TodoListComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,

    // Material
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [
    NavBarComponent,
    UserImgComponent,
    TodoItemComponent,
    TodoListComponent,
    IconComponent,

    // Material
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ComponentsModule {}

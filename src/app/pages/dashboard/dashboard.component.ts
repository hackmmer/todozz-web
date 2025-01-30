import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo, IWorkspace } from '../../interfaces/todo';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageTodoComponent } from '../../modals/todos/manage-todo/manage-todo.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  todos: ITodo[] = [];
  workspaces: IWorkspace[] = [];

  constructor(private _todoService: TodoService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this._todoService.getWorkspaces()?.subscribe((e) => {
      this.workspaces = e;
    });
  }

  addEditTodo(workspace: IWorkspace, todo?: ITodo) {
    this._dialog
      .open(ManageTodoComponent, {
        data: {
          isEdit: !!todo,
          todo: todo,
        },
      })
      .afterClosed()
      .subscribe((e: ITodo) => {
        workspace.todos.push(e);
      });
  }
}

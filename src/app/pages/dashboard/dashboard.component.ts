import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITask, ITodo, IWorkspace } from '../../interfaces/todo';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageTodoComponent } from '../../modals/todos/manage-todo/manage-todo.component';
import { ManageWorkspaceComponent } from '../../modals/manage-workspace/manage-workspace.component';

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
    const isEdit = !!todo;
    this._dialog
      .open(ManageTodoComponent, {
        data: {
          isEdit,
          todo,
        },
      })
      .afterClosed()
      .subscribe((e: ITodo) => {
        if (isEdit) {
          // edit logic here
          return;
        }
        this._todoService.createTodo(workspace.token, e).subscribe((e) => {
          workspace.todos.push(e);
        });
      });
  }

  addEditWorkspace(workspace?: IWorkspace) {
    const isEdit = !!workspace;
    this._dialog
      .open(ManageWorkspaceComponent, {
        data: {
          isEdit,
          workspace,
        },
      })
      .afterClosed()
      .subscribe((e: IWorkspace) => {
        if (isEdit) {
          // edit logic here
          return;
        }
        this._todoService.createWorkspace(e).subscribe((e) => {
          this.workspaces.push(e);
        });
      });
  }

  todoChanges($event: any) {
    let { todo, task } = $event;
    console.log(task);
    this._todoService.updateTask(task).subscribe((e) => {});
  }
}

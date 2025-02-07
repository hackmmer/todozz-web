import { Workspace } from './../../interfaces/todo';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITask, ITodo, IWorkspace } from '../../interfaces/todo';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageTodoComponent } from '../../modals/todos/manage-todo/manage-todo.component';
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component';
import { ManageWorkspaceComponent } from '../../modals/workspaces/manage-workspace/manage-workspace.component';
import { MODAL_CONFIG } from '../../modals/classes/BaseModal';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  todos: ITodo[] = [];
  workspaces: IWorkspace[] = [];

  timeoutHandler: NodeJS.Timeout | null = null;
  isLoading: boolean = false;

  constructor(
    private _todoService: TodoService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._todoService.getWorkspaces()?.subscribe((e) => {
      this.workspaces = e;
      this.isLoading = false;
      this._cdr.detectChanges();
    });
  }

  addEditTodo(workspace: IWorkspace, todo?: ITodo) {
    const isEdit = !!todo;
    const DialogConfig = MODAL_CONFIG({
      isEdit,
      todo,
    });
    this._dialog
      .open(ManageTodoComponent, DialogConfig)
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
    const DialogConfig = MODAL_CONFIG({
      isEdit,
      workspace,
    });
    this._dialog
      .open(ManageWorkspaceComponent, DialogConfig)
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
    this._todoService.updateTask(task).subscribe((e) => {});
  }

  workspaceHolding(workspace: IWorkspace) {
    this.timeoutHandler = setTimeout(() => {
      this.deleteWorkspace(workspace);
      this.timeoutHandler = null;
    }, 500);
  }

  workspaceRelease() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  deleteWorkspace(workspace: IWorkspace) {
    this.openConfirm('Workspace').subscribe((e: boolean) => {
      this.isLoading = true;
      this._todoService.deleteWorkspace(workspace);
      this.workspaces = this.workspaces.filter(
        (w) => workspace.token !== w.token
      );
      setTimeout(() => {
        this.isLoading = false;
        this._cdr.detectChanges();
      }, 500);
    });
  }

  deleteTodo(todo: ITodo) {
    this.openConfirm('Todo').subscribe((e: boolean) => {
      this.isLoading = true;
      // this._todoService.deleteWorkspace(workspace);
      // this.workspaces = this.workspaces.filter(
      //   (w) => workspace.token !== w.token
      // );
      setTimeout(() => {
        this.isLoading = false;
        this._cdr.detectChanges();
      }, 500);
    });
  }

  openConfirm(kinda: string) {
    const DialogConfig = MODAL_CONFIG({
      kinda,
    });
    return this._dialog
      .open(DeleteItemComponent, DialogConfig)
      .afterClosed()
      .pipe(filter((data) => !!data));
  }
}

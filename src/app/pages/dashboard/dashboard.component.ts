import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo, IWorkspace } from '../../interfaces/todo';
import { MatDialog } from '@angular/material/dialog';
import { ManageTodoComponent } from '../../modals/todos/manage-todo/manage-todo.component';
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component';
import { ManageWorkspaceComponent } from '../../modals/workspaces/manage-workspace/manage-workspace.component';
import { MODAL_CONFIG } from '../../modals/classes/BaseModal';
import { filter, take } from 'rxjs';
import { ShareWorkspaceComponent } from '../../modals/workspaces/share-workspace/share-workspace.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  workspaces: IWorkspace[] = [];

  timeoutHandler: NodeJS.Timeout | null = null;
  isLoading: boolean = true;

  constructor(
    private _todoService: TodoService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._updateWorkspaces();
  }

  _updateWorkspaces() {
    this.isLoading = true;
    this._todoService.getWorkspaces()?.subscribe((e) => {
      this.workspaces = e;
      this._switchLoading();
    });
  }

  addEditTodo(workspace: IWorkspace, todo?: ITodo) {
    const isEdit = !!todo;
    const DialogConfig = MODAL_CONFIG({
      isEdit,
      todo,
    }, {
      width: "50%"
    });
    this._dialog
      .open(ManageTodoComponent, DialogConfig)
      .afterClosed()
      .pipe(take(1))
      .pipe(filter((e) => !!e))
      .subscribe((e: ITodo) => {
        if (isEdit) {
          this._switchLoading();
          this._todoService.updateTodo(todo.token ?? '', e).subscribe((e) => {
            this._updateWorkspaces(); // TODO: Change this for update todo in workspace
            this._cdr.detectChanges();
          });
          return;
        }
        this._switchLoading();
        this._todoService.createTodo(workspace.token, e).subscribe((e) => {
          workspace.todos.push(e);
          this._switchLoading();
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
      .pipe(take(1))
      .pipe(filter((e) => !!e))
      .subscribe((e: IWorkspace) => {
        if (isEdit) {
          // edit logic here
          return;
        }
        this._switchLoading();
        this._todoService.createWorkspace(e).subscribe((e) => {
          this.workspaces.push(e);
          this._switchLoading();
        });
      });
  }

  todoChanges($event: any) {
    let { todo, task } = $event;
    this._todoService.updateTask(task).subscribe((e) => { });
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
      this._switchLoading();
      this._todoService.deleteWorkspace(workspace).subscribe((res) => {
        this.workspaces = this.workspaces.filter(
          (w) => workspace.token !== w.token
        );
        this._switchLoading();
      });
    });
  }

  deleteTodo(todo: ITodo) {
    this.openConfirm('Todo').subscribe((e: boolean) => {
      this._switchLoading();
      this._todoService.deleteTodo(todo).subscribe((_) => {
        this._todoService.getWorkspaces()?.subscribe((w) => {
          this.workspaces = w;
          this._switchLoading();
        });
      });
    });
  }

  private _switchLoading() {
    this.isLoading = !this.isLoading;
    this._cdr.detectChanges();
  }

  shareWorkspace(w: IWorkspace) {
    const DialogConfig = MODAL_CONFIG({
      workspace: w,
    });
    this._dialog
      .open(ShareWorkspaceComponent, DialogConfig)
      .afterClosed()
      .pipe(take(1))
      .pipe(filter((data) => !!data))
      .subscribe((e) => { });
  }

  openConfirm(kinda: string) {
    const DialogConfig = MODAL_CONFIG({
      kinda,
    });
    return this._dialog
      .open(DeleteItemComponent, DialogConfig)
      .afterClosed()
      .pipe(take(1))
      .pipe(filter((data) => !!data));
  }
}

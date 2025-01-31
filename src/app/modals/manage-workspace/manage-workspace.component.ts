import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IWorkspace } from '../../interfaces/todo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ManageTodoComponent } from '../todos/manage-todo/manage-todo.component';
import { Helper } from '../../utils/helper';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-manage-workspace',
  standalone: false,

  templateUrl: './manage-workspace.component.html',
  styleUrl: './manage-workspace.component.scss',
})
export class ManageWorkspaceComponent {
  title!: string;
  private readonly data: {
    isEdit: boolean;
    todo?: IWorkspace;
  } = inject(MAT_DIALOG_DATA);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor(
    private _dialog: MatDialogRef<ManageTodoComponent>,
    private _todoService: TodoService
  ) {
    this.title = this.data.isEdit ? 'Update Todo' : 'Create Todo';

    this.form = this._formBuilder.group({
      title: new FormControl(this.data.todo?.title ?? '', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  close() {
    const result: IWorkspace = {
      title: this.form.get('title')?.value,
      token: Helper.createToken(this.form.get('title')?.value),
      todos: [],
    };
    this._todoService.createWorkspace(result).subscribe((e) => {
      this._dialog.close(e);
    });
  }
}

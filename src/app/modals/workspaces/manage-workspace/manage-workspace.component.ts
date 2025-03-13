import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IWorkspace } from '../../../interfaces/todo';
import { Helper } from '../../../utils/helper';
import { ManageTodoComponent } from '../../todos/manage-todo/manage-todo.component';

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
    workspace?: IWorkspace;
  } = inject(MAT_DIALOG_DATA);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor(private _dialog: MatDialogRef<ManageTodoComponent>) {
    this.title = this.data.isEdit ? 'Update Workspace' : 'Create Workspace';

    this.form = this._formBuilder.group({
      title: new FormControl(this.data.workspace?.title ?? '', [
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
    this._dialog.close(result);
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodo } from '../../../interfaces/todo';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-manage-todo',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-todo.component.html',
  styleUrl: './manage-todo.component.scss',
})
export class ManageTodoComponent implements OnInit {
  title!: string;
  private readonly data: {
    isEdit: boolean;
    todo?: ITodo;
  } = inject(MAT_DIALOG_DATA);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  tasks: ITodo[] = [];

  constructor(private _dialog: MatDialogRef<ManageTodoComponent>, private _cdr: ChangeDetectorRef) {
    this.title = this.data.isEdit ? 'Update Todo' : 'Create Todo';

    this.form = this._formBuilder.group({
      title: new FormControl(this.data.todo?.title ?? '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.data.todo?.description ?? '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      checkers: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.form.get('checkers')?.valueChanges.subscribe(e => {
      if (e.length != this.tasks.length)
        this.tasks = e;
    })

  }

  addTask() {
    (this.form.get('checkers') as FormArray).push(
      new FormGroup({
        value: new FormControl(false),
        text: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
    )
    this._cdr.detectChanges();
  }

  close() {
    const todo: ITodo = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      checkers: this.form.get('checkers')?.value,
    };
    this._dialog.close(todo);
  }
}

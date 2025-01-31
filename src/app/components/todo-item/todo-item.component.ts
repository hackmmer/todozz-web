import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ITask, ITodo } from '../../interfaces/todo';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  standalone: false,

  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() todo!: ITodo;

  @Input() onChange = (task: ITask, change: any) => {};
  @Input() onTouched = () => {};

  @Output() public changeValues = new EventEmitter<any>();

  controllers!: FormControl[];
  private changes: Subscription[] = [];

  // constructor(@Self() public controlDir: NgControl) {
  //   this.controlDir.valueAccessor = this;
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.controllers = this.todo.checkers.map((e) => {
      const control = new FormControl(e.value);
      this.changes.push(
        control.valueChanges.subscribe((change) => {
          this.changeValues.emit({
            ...e,
            value: change,
          });
        })
      );
      return control;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.changes.forEach((c) => {
      c.unsubscribe();
    });
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}

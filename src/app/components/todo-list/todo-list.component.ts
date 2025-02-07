import { Component, EventEmitter, Host, Input, Output } from '@angular/core';
import { ITask, ITodo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo-list',
  standalone: false,

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todos?: ITodo[];

  @Output() changes = new EventEmitter<{
    todo: ITodo;
    task: ITask;
  }>();

  @Output('todoDeleted') _todoDeleted = new EventEmitter<ITodo>()

  todoChangesValues(todo: ITodo, task: ITask) {
    this.changes.emit({ todo, task });
  }

  todoDeleted(todo: ITodo) {
    this._todoDeleted.emit(todo);
  }

}

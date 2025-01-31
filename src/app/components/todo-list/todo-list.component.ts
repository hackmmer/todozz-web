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

  todoChangesValues(todo: ITodo, task: ITask) {
    // console.log(task)
    this.changes.emit({ todo, task });
  }
}

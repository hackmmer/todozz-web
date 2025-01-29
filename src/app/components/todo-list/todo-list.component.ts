import { Component, Host, Input } from '@angular/core';
import { ITodo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo-list',
  standalone: false,

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todos?: ITodo[];
}

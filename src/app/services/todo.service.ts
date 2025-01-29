import { Injectable } from '@angular/core';
import { ITodo, IWorkspace } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly TODOS: ITodo[] = [
    {
      title: 'Todo 1',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: true,
        },
        {
          text: 'Task 3',
          value: false,
        },
        {
          text: 'Task 4',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 2',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 3',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 1',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: true,
        },
        {
          text: 'Task 3',
          value: false,
        },
        {
          text: 'Task 4',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 2',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 3',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 1',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: true,
        },
        {
          text: 'Task 3',
          value: false,
        },
        {
          text: 'Task 4',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 2',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 3',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 1',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: true,
        },
        {
          text: 'Task 3',
          value: false,
        },
        {
          text: 'Task 4',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 2',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima aut recusandae dicta explicabo suscipit excepturi nobis adipisci facere, at ipsam. Pariatur omnis fuga saepe facere quo nostrum alias deserunt molestiae!',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
    {
      title: 'Todo 3',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      checkers: [
        {
          text: 'Task 1',
          value: false,
        },
        {
          text: 'Task 2',
          value: false,
        },
        {
          text: 'Task 3',
          value: false,
        },
      ],
    },
  ];

  private readonly WORKSPACES: IWorkspace[] = [
    {
      token: 'asd-123',
      title: 'Workspace X',
      todos: this.TODOS,
    },
    {
      token: 'asd-456',
      title: 'Workspace Y',
      todos: [],
    },
    {
      token: 'asd-789',
      title: 'Workspace Z',
      todos: this.TODOS,
    },
  ];

  constructor() {}

  getAllTodos() {
    return this.TODOS;
  }
  getWorkspace(token: string) {
    return this.WORKSPACES.find(e => e.token === token);
  }
  createTodo(workspace: string, todo: ITodo) {
    this.WORKSPACES.find(e => e.token === workspace)?.todos.push(todo)
  }

}

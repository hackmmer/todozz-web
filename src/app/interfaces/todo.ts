export interface ITodo {
  title: string;
  description?: string;
  token?: string;
  checkers: ITask[]
}

export interface ITask {
  text: string;
  value: boolean;
  token?: string;
}

export interface IWorkspace {
  token: string;
  title: string;
  todos: ITodo[];
}

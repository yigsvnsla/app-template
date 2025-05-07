import type { todoController } from '@api/modules/todo/todo.controller';
import type { TodoRepository } from '@api/modules/todo/todo.repository';
import { Check, Value } from '@sinclair/typebox/value';
import { type InferContext, type Static, StatusMap, t } from 'elysia';
import { TodoExeption } from './todo.error';
import {
  type CreateTodoSchema,
  type TodoInsertSchema,
  todoInsertSchema,
} from './todo.schema';

export class TodoService {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  public async todoById(id: string) {
    const todo = await this._todoRepository.findById(id).catch((error) => {
      throw new TodoExeption(
        StatusMap['Internal Server Error'],
        'Todo Repository Error.',
      );
    });

    if (!todo) {
      throw new TodoExeption(StatusMap['Not Found'], 'Todo not found.');
    }

    return todo;
  }

  public async todoList() {
    return this._todoRepository.find();
  }

  public async createTodo(todos: CreateTodoSchema[]) {
    return this._todoRepository.create(todos);
  }

  public async checkAuth(ctx: InferContext<typeof todoController>) {}
}

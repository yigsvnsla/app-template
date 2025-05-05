import { todoMacros } from '@api/modules/todo/todo.macro';
import { TodoRepository } from '@api/modules/todo/todo.repository';
import { TodoService } from '@api/modules/todo/todo.service';
import { Elysia } from 'elysia';

export const todoModule = new Elysia({
  name: 'TodoModule',
})
  .decorate(() => ({
    todoService: new TodoService(new TodoRepository()),
  }))
  .use(todoMacros);

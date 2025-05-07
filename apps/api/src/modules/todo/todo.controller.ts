import { TodoSchema, createTodoSchema } from '@api/modules/todo/todo.schema';
import { todoSelectSchema } from '@api/modules/todo/todo.schema';

import { paginationQuerySchema } from '@api/common/schemas/pagination.schema';
import { Elysia, StatusMap, t } from 'elysia';
import { TodoExeption, TodoStatusMapErrors } from './todo.error';
import { todoModule } from './todo.module';

export const todoController = new Elysia({
  name: 'TodoController',
  detail: {
    tags: ['Todo'],
  },
}).group(
  'todo',
  (app) =>
    app
      .error({ TodoExeption })
      .onError((ctx) => {
        if (ctx.error instanceof TodoExeption) {
          ctx.set.status = ctx.error.statusCode;
          return {
            status: ctx.error.statusCode,
            name: ctx.error.name,
            message: ctx.error.message,
          };
        }
      })
      .use(todoModule)
      // Obtener todas las tareas
      .get(
        '',
        async (ctx) => {
          ctx.query.

          return await ctx.todoService.todoList();
        },
        {
          permissionToReadTodos: false,
          query: paginationQuerySchema(todoSelectSchema),
          response: {
            [StatusMap.OK]: t.Array(todoSelectSchema),
            [StatusMap['Bad Request']]: t.Optional(
              t.Object({
                message: t.Optional(t.String()),
              }),
            ),
            [StatusMap.Forbidden]: t.Optional(
              t.Object({
                message: t.Optional(t.String()),
              }),
            ),
          },
        },
      )

      // Obtener una tarea por su ID
      .get(
        '/:id',
        async (ctx) => {
          return ctx.todoService.todoById(ctx.params.id);
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          response: {
            [StatusMap.OK]: TodoSchema,
            ...TodoStatusMapErrors,
          },
        },
      )

      // Crear una nueva tarea
      .post(
        '',
        async (ctx) => {
          return await ctx.todoService.createTodo(ctx.body);
        },
        {
          body: t.Array(createTodoSchema),
          response: {
            [StatusMap.OK]: t.Array(TodoSchema),
            [StatusMap['Bad Request']]: t.Optional(
              t.Object({
                message: t.Optional(t.String()),
              }),
            ),
            [StatusMap.Forbidden]: t.Optional(
              t.Object({
                message: t.Optional(t.String()),
              }),
            ),
          },
        },
      ),
  // // Actualizar una tarea existente
  // .put(
  // 	"/:id",
  // 	async ({ params, body }) => {
  // 		const index = todos.findIndex((t) => t.id === params.id);
  // 		if (index === -1) return { error: "Tarea no encontrada" };

  // 		const { title, completed } = body;
  // 		todos[index] = {
  // 			...todos[index],
  // 			title: title ?? todos[index].title,
  // 			completed: completed ?? todos[index].completed,
  // 		};
  // 		return todos[index];
  // 	},
  // 	{
  // 		params: elysia.t.Object({
  // 			id: elysia.t.String(),
  // 		}),
  // 		body: TodoSchema,
  // 	},
  // )

  // // Eliminar una tarea
  // .delete(
  // 	"/:id",
  // 	({ params }) => {
  // 		const index = todos.findIndex((t) => t.id === params.id);
  // 		if (index === -1) return { error: "Tarea no encontrada" };

  // 		const removed = todos.splice(index, 1);
  // 		return removed[0];
  // 	},
  // 	{
  // 		params: elysia.t.Object({
  // 			id: elysia.t.String(),
  // 		}),
  // 	},
  // ),
);

import Elysia, { type Static, t } from "elysia";
import { betterAuthClient } from "./../../../packages/clients/src/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "./../../../packages/clients/src/better-auth.openapi";

const TodoSchema = t.Object({
	id: t.String(),
	title: t.String(),
	completed: t.Boolean(),
});

type Todo = Static<typeof TodoSchema>;
// Arreglo en memoria para almacenar las tareas
const todos: Todo[] = [];

export const Todo = new Elysia({
	name: "todo-api",
	detail: {
		tags: ["Todo"],
	},
}).group("todo", (app) =>
	app
		// Obtener todas las tareas
		.get(
			"",
			async ({ request }) => {
				const response = await betterAuthClient.POST(
					BetterAuthApiPaths.PostAdminHaspermission,
					{
						request,
					},
				);

				console.log(response);

				return todos;
			},
			{
				response: t.Array(TodoSchema),
			},
		)

		// Obtener una tarea por su ID
		.get(
			"/:id",
			({ params }) => {
				const todo = todos.find((t) => t.id === params.id);
				if (!todo) throw new Error();
				return todo;
			},
			{
				params: t.Object({
					id: t.String(),
				}),
			},
		)

		// Crear una nueva tarea
		.post(
			"",
			async ({ body }) => {
				const { title } = body;
				const newTodo = { id: Bun.randomUUIDv7(), title, completed: false };
				todos.push(newTodo);
				return newTodo;
			},
			{
				body: TodoSchema,
				response: TodoSchema,
			},
		)
		// Actualizar una tarea existente
		.put(
			"/:id",
			async ({ params, body }) => {
				const index = todos.findIndex((t) => t.id === params.id);
				if (index === -1) return { error: "Tarea no encontrada" };

				const { title, completed } = body;
				todos[index] = {
					...todos[index],
					title: title ?? todos[index].title,
					completed: completed ?? todos[index].completed,
				};
				return todos[index];
			},
			{
				params: t.Object({
					id: t.String(),
				}),
				body: TodoSchema,
			},
		)

		// Eliminar una tarea
		.delete(
			"/:id",
			({ params }) => {
				const index = todos.findIndex((t) => t.id === params.id);
				if (index === -1) return { error: "Tarea no encontrada" };

				const removed = todos.splice(index, 1);
				return removed[0];
			},
			{
				params: t.Object({
					id: t.String(),
				}),
			},
		),
);

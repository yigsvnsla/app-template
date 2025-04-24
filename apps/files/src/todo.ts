import Elysia, { type Static, t, Error } from "elysia";

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
		.get("/todos", () => todos, {
			response: t.Array(TodoSchema),
		})

		// Obtener una tarea por su ID
		.get("/todos/:id", ({ params }) => {
			const todo = todos.find((t) => t.id === params.id);
			if (!todo) throw new Error();
			return todo;
		})

		// Crear una nueva tarea
		.post("/todos", async ({ body }) => {
			const { title } = await body;
			const newTodo = { id: Bun.randomUUIDv7(), title, completed: false };
			todos.push(newTodo);
			return newTodo;
		})
		// Actualizar una tarea existente
		.put("/todos/:id", async ({ params, body }) => {
			const index = todos.findIndex((t) => t.id === params.id);
			if (index === -1) return { error: "Tarea no encontrada" };

			const { title, completed } = await body;
			todos[index] = {
				...todos[index],
				title: title ?? todos[index].title,
				completed: completed ?? todos[index].completed,
			};
			return todos[index];
		})

		// Eliminar una tarea
		.delete("/todos/:id", ({ params }) => {
			const index = todos.findIndex((t) => t.id === params.id);
			if (index === -1) return { error: "Tarea no encontrada" };

			const removed = todos.splice(index, 1);
			return removed[0];
		}),
);

import { TodoRepository } from "@api/modules/todo/todo.repository";
import { TodoService } from "@api/modules/todo/todo.service";
import { Elysia } from "elysia";

export const todoModule = new Elysia({ name: "TodoModule" }).decorate(() => {
	const todoRepository = new TodoRepository();
	const todoService = new TodoService(todoRepository);
	return {
		todoService,
	};
});

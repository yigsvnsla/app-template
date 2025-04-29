import type { todoController } from "@api/modules/todo/todo.controller";
import type { TodoRepository } from "@api/modules/todo/todo.repository";
import type { InferContext } from "elysia";
import type { TodoInsertSchema } from "./todo.schema";

export class TodoService {
	private _todoRepository: TodoRepository;

	constructor(todoRepository: TodoRepository) {
		this._todoRepository = todoRepository;
	}

	public async todoById(id: string) {
		return this._todoRepository.findById(id);
	}

	public async todoList() {
		return this._todoRepository.find();
	}

	public async createTodo(todo: TodoInsertSchema) {
		return this._todoRepository.create(todo);
	}

	public async checkAuth(ctx: InferContext<typeof todoController>) {}
}

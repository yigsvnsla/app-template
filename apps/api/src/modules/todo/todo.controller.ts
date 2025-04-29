import {
	TodoInsertSchema,
	todoInsertSchema,
} from "@api/modules/todo/todo.schema";
import { todoSelectSchema } from "@api/modules/todo/todo.schema";
import { betterAuthClient } from "@package/clients/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/clients/better-auth.openapi";
import { Elysia, StatusMap, t } from "elysia";
import { todoModule } from "./todo.module";

export const todoController = new Elysia({
	name: "TodoController",
	detail: {
		tags: ["Todo"],
	},
}).group(
	"todo",
	(app) =>
		app
			.use(todoModule)
			// Obtener todas las tareas
			.get(
				"",
				async (ctx) => {
					const { error, data } = await betterAuthClient.POST(
						BetterAuthApiPaths.PostAdminHaspermission,
						{
							headers: ctx.headers,
							body: {
								permissions: {
									todo: ["read"],
								},
							},
						},
					);

					if (error) {
						return ctx.error(StatusMap["Bad Request"], error);
					}

					if (!data.success) {
						return ctx.error(StatusMap.Forbidden, {
							message: "NO TIENES PERMISOS PARA ESTE METODO",
						});
					}

					return await ctx.todoService.todoList();
				},
				{
					response: {
						[StatusMap.OK]: t.Array(todoSelectSchema),
						[StatusMap["Bad Request"]]: t.Optional(
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
				"/:id",
				async (ctx) => {
					const { error, data } = await betterAuthClient.POST(
						BetterAuthApiPaths.PostAdminHaspermission,
						{
							headers: ctx.headers,
							body: {
								permissions: {
									todo: ["read"],
								},
							},
						},
					);

					if (error) {
						return ctx.error(StatusMap["Bad Request"], error);
					}

					if (!data.success) {
						return ctx.error(StatusMap.Forbidden, {
							message: "NO TIENES PERMISOS PARA ESTE METODO",
						});
					}

					return await ctx.todoService.todoById(ctx.params.id);
				},
				{
					params: t.Object({
						id: t.String(),
					}),
					response: {
						[StatusMap.OK]: todoSelectSchema,
						[StatusMap["Bad Request"]]: t.Optional(
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

			// Crear una nueva tarea
			.post(
				"",
				async (ctx) => {
					const { error, data } = await betterAuthClient.POST(
						BetterAuthApiPaths.PostAdminHaspermission,
						{
							headers: ctx.headers,
							body: {
								permissions: {
									todo: ["create"],
								},
							},
						},
					);

					if (error) {
						return ctx.error(StatusMap["Bad Request"], error);
					}

					if (!data.success) {
						return ctx.error(StatusMap.Forbidden, {
							message: "NO TIENES PERMISOS PARA ESTE METODO",
						});
					}

					return await ctx.todoService.createTodo(ctx.body);
				},
				{
					params: t.Object({
						id: t.String(),
					}),
					body: todoInsertSchema,
					response: {
						[StatusMap.OK]: todoSelectSchema,
						[StatusMap["Bad Request"]]: t.Optional(
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

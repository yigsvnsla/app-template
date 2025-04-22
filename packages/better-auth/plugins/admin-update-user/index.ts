import { auth } from "@package/better-auth/auth";
import type {
	BetterAuthClientPlugin,
	BetterAuthPlugin,
	Session,
} from "better-auth";

import {
	APIError,
	getSessionFromCtx,
	sessionMiddleware,
} from "better-auth/api";

import type { BetterFetchOption } from "better-auth/client";

import {
	type AdminOptions,
	type UserWithRole,
	createAuthEndpoint,
	createAuthMiddleware,
} from "better-auth/plugins";

import { z } from "zod";

export type InferAdminRolesFromOption<O extends AdminOptions | undefined> =
	O extends { roles: Record<string, unknown> }
		? keyof O["roles"]
		: "user" | "admin";

export const adminUpdateUser = <O extends AdminOptions>(options?: O) => {
	const opts = {
		defaultRole: options?.defaultRole ?? "user",
		adminRoles: options?.adminRoles ?? ["admin"],
		bannedUserMessage:
			options?.bannedUserMessage ??
			"You have been banned from this application. Please contact support if you believe this is an error.",
		...options,
	};

	return {
		id: "admin",
		endpoints: {
			adminUpdateUser: createAuthEndpoint(
				"/admin/update-user",
				{
					method: "POST",
					requireHeaders: true,
					body: updateUserSchema,
					$Infer: {
						body: {} as {
							user: {
								email: string;
								password: string;
								name: string;
								role?:
									| InferAdminRolesFromOption<O>
									| InferAdminRolesFromOption<O>[];
								data?: Record<string, unknown>;
							};
						},
					},
					metadata: {
						openapi: {
							description: "Update Current User",
							operationId: "updateUser",
							tags: ["Admin"],
							requestBody: {
								content: {
									"application/json": {
										schema: {
											properties: {
												user: {
													type: "object",
													$ref: "#/components/schemas/User",
												},
											},
										},
									},
								},
							},
						},
					},
				},
				async (ctx) => {
					if (!ctx.body?.user) {
						throw ctx.error("BAD_REQUEST");
					}

					const session = await getSessionFromCtx<{ role: string }>(ctx);

					if (!session && (ctx.request || ctx.headers)) {
						throw ctx.error("FORBIDDEN", {
							message: auth.$ERROR_CODES.FAILED_TO_GET_SESSION,
						});
					}

					const canCreateUser = await auth.api.userHasPermission({
						body: {
							userId: ctx.body?.user.id, //the user id
							permission: {
								user: ["create"],
							},
						},
					});

					if (!canCreateUser.success) {
						throw ctx.error("FORBIDDEN", {
							// message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS,
							message:
								auth.$ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER, // TODO: REPLACE CREATE -> UPDATE
						});
					}

					const existUser = await ctx.context.internalAdapter.findUserById(
						ctx.body?.user.id,
					);

					if (!existUser) {
						throw ctx.error("NOT_FOUND", {
							message: auth.$ERROR_CODES.USER_NOT_FOUND,
						});
					}

					console.log(existUser);

					return ctx.json({
						message: "Hello World",
						// session: ctx.context.session,
					});
				},
			),
		},
	} satisfies BetterAuthPlugin;
};

const adminUpdateUserClient = () => {
	return {
		id: "admin-test",
		$InferServerPlugin: {} as ReturnType<typeof adminUpdateUser>,
		getActions: ($fetch) => {
			return {
				myCustomAction: async (
					data: z.infer<typeof updateUserSchema>,
					fetchOptions?: BetterFetchOption,
				) => {
					return $fetch("/admin/update-user", {
						method: "POST",
						body: data,
						...fetchOptions,
					});
				},
			};
		},
	} satisfies BetterAuthClientPlugin;
};

const updateUserSchema = z.optional(
	z.object({
		user: z.object({
			id: z.string({
				description: "The id of the user",
			}),
			email: z.string({
				description: "The email of the user",
			}),
			// password: z.string({
			// 	description: "The password of the user",
			// }),
			name: z.string({
				description: "The name of the user",
			}),
			role: z
				.union([
					z.string({
						description: "The role of the user",
					}),
					z.array(
						z.string({
							description: "The roles of user",
						}),
					),
				])
				.optional(),
			/**
			 * extra fields for user
			 */
			data: z.optional(
				z.record(z.any(), {
					description:
						"Extra fields for the user. Including custom additional fields.",
				}),
			),
		}),
	}),
);

// export const hasPermission = (
// 	input: {
// 		userId?: string;
// 		role?: string;
// 		options?: AdminOptions;
// 	} & PermissionExclusive,
// ) => {
// 	if (input.userId && input.options?.adminUserIds?.includes(input.userId)) {
// 		return true;
// 	}
// 	if (!input.permissions && !input.permission) {
// 		return false;
// 	}
// 	const roles = (input.role || input.options?.defaultRole || "user").split(",");
// 	const acRoles = input.options?.roles || defaultRoles;
// 	for (const role of roles) {
// 		const _role = acRoles[role as keyof typeof acRoles];
// 		const result = _role?.authorize(input.permission ?? input.permissions);
// 		if (result?.success) {
// 			return true;
// 		}
// 	}
// 	return false;
// };

// const p = ctx.context.options.plugins?.find((p) => p.id === "admin");
// if (!p) {
// 	throw new Error("PLUGIN NOT FOUND");
// }

// if (!p.endpoints) {
// 	throw new Error("PLUGIN ENDPOINTS NOT FOUND");
// }
// console.log(p.endpoints.userHasPermission());

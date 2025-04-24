import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
	user: ["create", "read", "update", "delete", "ban"],
	content: ["create", "read", "update", "delete", "moderate"],
	settings: ["read", "update"],
	todo: ["create", "delete", "update", "read"],
} as const;

// Create the access control instance
export const ac = createAccessControl(statements);

export const roles = {
	user: ac.newRole({
		user: ["read"],
		content: ["read", "create"],
		settings: ["read"],
		todo: ["create", "read"],
	}),

	moderator: ac.newRole({
		user: ["read"],
		content: ["read", "create", "update", "delete", "moderate"],
		settings: ["read"],
		todo: ["read", "delete"],
	}),

	admin: ac.newRole({
		user: ["create", "read", "update", "delete", "ban"],
		content: ["create", "read", "update", "delete", "moderate"],
		settings: ["read", "update"],
    todo: ["create", "delete", "update", "read"],
	}),
};

// const statement = {
// 	...defaultStatements,
// 	project: ["create", "share", "update", "delete"],
// } as const;

// export const ac = createAccessControl(statement);

// export const userRole = ac.newRole({
// 	project: ["create"],
// });

// export const adminRole = ac.newRole({
// 	project: ["create", "update"],
// 	...adminAc.statements,
// });

// export const myCustomRole = ac.newRole({
// 	project: ["create", "update", "delete"],

// 	user: ["ban"],
// });

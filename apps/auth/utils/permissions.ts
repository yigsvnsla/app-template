import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
	...defaultStatements,
	// content: ["create", "read", "update", "delete", "moderate"],
	// settings: ["read", "update"],
	todo: ["create", "delete", "update", "read"],
} as const;

// Create the access control instance
export const ac = createAccessControl(statements);

export const roles = {
	
	user: ac.newRole({
		// content: ["read", "create"],
		// settings: ["read"],
		todo: ["create", "read"],
	}),

	moderator: ac.newRole({
		// content: ["read", "create", "update", "delete", "moderate"],
		// settings: ["read"],
		todo: ["read", "delete"],
	}),

	admin: ac.newRole({
		...adminAc.statements,
		todo: ["create", "delete", "update", "read"],
	}),
};



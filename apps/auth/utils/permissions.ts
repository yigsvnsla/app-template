import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, ownerAc } from "better-auth/plugins/organization/access";

const customStatements = {
  ...defaultStatements,
  project: ["create", "read", "update", "delete"],
} as const;

// Create the access control instance
export const ac = createAccessControl({
  ...customStatements,
});

export const roles = {
  owner: ac.newRole({
    project: ["create", "update", "delete"],

    ...ownerAc.statements,
  }),

  admin: ac.newRole({
    project: ["create", "update"],
    ...adminAc.statements,
  }),
};

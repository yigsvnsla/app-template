import { ac, roles } from "@app/auth/utils/permissions";
import { organization } from "better-auth/plugins";

export const organizationPlugin = organization({
  ac,
  roles,
  dynamicAccessControl: {
    enabled: true,
  },
  teams: {
    enabled: true,
    maximumTeams: 10,
    allowRemovingAllTeams: false,
  },
  organizationHooks: {},
  schema: {
    organization: {
      additionalFields: {
        myCustomField: {
          type: "string",
          input: true,
          required: false,
        },
      },
    },
  },
});

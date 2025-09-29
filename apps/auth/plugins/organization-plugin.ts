import { organization } from "better-auth/plugins";
import { ac, roles } from '../utils/permissions';

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
})
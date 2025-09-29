import useSWR from "swr";
import { authApiClient } from "@/utils/auth-api-client";

export const useGetOrgStadistics = () => {
  return useSWR("/organization/stadistics", async (_) => {
    const response = await authApiClient.auth.api.organization.stadistics.get({
      fetch: {
        credentials: "include",
      },
    });
    if (response.error) {
      throw response.error;
    }

    return response.data;
  });
};

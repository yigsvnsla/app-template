import useSWR from "swr";
import { authApiClient } from "@/utils/auth-api-client";

export const useGetOrgListRenforced = () => {
  return useSWR("/organization/list-renforced", async (_) => {
    const response = await authApiClient.auth.api.organization["list-renforced"].get({
      $fetch: {
        credentials: "include",
      },
      $query: {
        limit: 10,
        offset: 1,
      },
      $headers: {},
    });
    if (response.error) {
      throw response.error;
    }

    return response.data;
  });
};

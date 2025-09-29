import { authApiClient } from "@/utils/auth-api-client";
import useSWR from "swr";

export const useGetOrgListRenforced = () => {
  return useSWR("/organization/list-renforced", async (path) => {
    const response = await authApiClient.auth.api.organization["list-renforced"].get({
      $fetch: {
        credentials: "include",
      },
      $query: {
        limit: 10,
        offset: 1,
      },
      $headers: {}
    });
    if (response.error) {
      throw response.error;
    }

    return response.data;
  });
};

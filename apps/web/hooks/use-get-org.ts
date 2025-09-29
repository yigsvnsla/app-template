import useSWR from "swr";
import { authApiClient } from "@/utils/auth-api-client";

export const useGetOrgRenforced = (orgId: string) => {
  return useSWR("/organization/list-renforced", async (_) => {
    const response = await authApiClient.auth.api.organization["list-renforced"]({ id: orgId }).get(
      {
        $fetch: {
          credentials: "include",
        },
        $headers: {},
      },
    );
    if (response.error) {
      throw response.error;
    }

    return response.data;
  });
};

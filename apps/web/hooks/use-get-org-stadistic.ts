import { authApiClient } from "@/utils/auth-api-client";
import useSWR from "swr";
import wretch from "wretch";

export const useGetOrgStadistics = () => {
  return useSWR("/organization/stadistics", async (path) => {
    const response  = await authApiClient.auth.api.organization.stadistics.get({
      $fetch:{
        credentials: "include"
      }
    })
    if (response.error){
      throw response.error
    }

    return response.data;
  });
};

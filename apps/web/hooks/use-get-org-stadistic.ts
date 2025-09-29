import useSWR from "swr";
import wretch from "wretch";

export const useGetOrgStadistics = () => {
  return useSWR("/organization/stadistics", async (path) => {
    return wretch("http://localhost:8888").url("/auth/api").get(path).json();
  });
};

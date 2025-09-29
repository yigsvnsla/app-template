import useSWR from "swr";
import wretch from "wretch";

export const useGetOrgListRenforced = () => {
  return useSWR("/organization/list-renforced", async (path) => {
    return wretch("http://localhost:8888")
      .url("/auth/api")
      .options({ credentials: "include" })
      .get(path)
      .json();
  });
};

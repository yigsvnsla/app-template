import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { authClient } from "@/utils/auth-client";

export default async function Layout({ children }: PropsWithChildren) {
  const headers = await nextHeaders();

  const session = await authClient.getSession({ fetchOptions: { headers } });

  if (!session) {
    redirect("/auth/sign-in"); // redirección server-side
  }

  return <>{children}</>;
}

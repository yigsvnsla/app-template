import type { ApiPaths, paths } from "@package/api/better-auth.openapi";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface useAuthState {
	token: string | null;
	user:
		| paths[ApiPaths.PostSigninEmail]["post"]["responses"]["200"]["content"]["application/json"]["user"]
		| null; // <-- optional to allow undefined

	setToken: (token: useAuthState["token"]) => void;
	setUser: (user: useAuthState["user"]) => void;
}

export const useAuthStore = create<useAuthState>()(
	devtools(
		persist(
			(set) => ({
				token: null, // <-- initially "unknown"
				user: null, // <-- initially "unknown",
				setToken: (token: string | null) =>
					set({ token }, undefined, "auth-tore:user/set-token"),
				setUser: (user: useAuthState["user"]) =>
					set({ user }, undefined, "auth-tore:user/set-user"),
			}),
			{
				name: "auth-store", // name of the item in the storage (must be unique)
			},
		),
	),
);

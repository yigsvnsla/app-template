import { Toaster } from "@package/ui/components/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, isRouteErrorResponse } from "react-router";
import { Theme, ThemeProvider } from "remix-themes";
import { links as RootLinks } from "~/root.links";
import { loader as rootLoader } from "~/root.loader";
import { meta as RootMeta } from "~/root.meta";
import { ErrorTemplate } from "~/templates/error.template";
import type { Route } from "./+types/root";
import { RootLayout } from "./root.layout";

export const links = RootLinks;
export const meta = RootMeta;

export const loader = rootLoader;

export function Layout({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(new QueryClient());
	// TODO: Revisar esto para intentar pasarlo a el ClientLoader
	// let data = useRouteLoaderData<typeof loader>("root");

	// if (typeof window !== "undefined") {
	// 	if (data) {
	// 		localStorage.setItem("theme", data.theme as Theme);
	// 	} else {
	// 		data = { theme: localStorage.getItem("theme") as Theme };
	// 	}
	// }

	const { theme }: { theme: Theme } = { theme: Theme.DARK };

	return (
		<ThemeProvider
			specifiedTheme={theme as Theme}
			themeAction="set-theme-action"
		>
			<QueryClientProvider client={queryClient}>
				<RootLayout ssrTheme={Boolean(theme)}>{children}</RootLayout>
				<Toaster />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return <ErrorTemplate message={message} details={details} stack={stack} />;
}

export function HydrateFallback() {
	return <h1>Loading...</h1>;
}

export default function App() {
	return <Outlet />;
}

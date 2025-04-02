import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteLoaderData,
} from "react-router";

import { Theme, ThemeProvider } from "remix-themes";
import { links as RootLinks } from "~/root.links";
import { loader as rootLoader } from "~/root.loader";
import { meta as RootMeta } from "~/root.meta";
import type { Route } from "./+types/root";
import { RootLayout } from "./root.layout";
import { ErrorTemplate } from "./templates/error.template";

export const links = RootLinks;
export const meta = RootMeta;

export const loader = rootLoader;

export function Layout({ children }: { children: React.ReactNode }) {
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
			<RootLayout ssrTheme={Boolean(theme)}>{children}</RootLayout>
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

export default function App() {
	return <Outlet />;
}

export function HydrateFallback() {
	return <h1>Loading...</h1>;
}

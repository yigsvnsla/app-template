import { cn } from "@package/ui/lib/utils";
import type { FC, PropsWithChildren } from "react";
import {
	Links,
	Meta,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { PreventFlashOnWrongTheme, Theme, useTheme } from "remix-themes";

interface RootLayoutProps extends PropsWithChildren {
	ssrTheme: boolean;
}

export const RootLayout: FC<RootLayoutProps> = ({ children, ssrTheme }) => {
	const [theme] = useTheme();

	console.log(`useTheme() inside InnerLayout = ${theme}`);
	console.log(`ssrTheme inside InnerLayout = ${ssrTheme}`);

	return (
		<html lang="en" data-theme={theme ?? ""} className={cn(theme)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body
			
				suppressHydrationWarning
			>
				{children}
				<ScrollRestoration />
				<PreventFlashOnWrongTheme ssrTheme={ssrTheme} />
				<Scripts />
			</body>
		</html>
	);
};

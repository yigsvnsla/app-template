import type { FC, PropsWithChildren } from "react";
import { useLoaderData } from "react-router";
import { Theme, ThemeProvider } from "remix-themes";

import type { loader } from "~/root.loader";

export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
	const data = useLoaderData<typeof loader>();

	return (
		<ThemeProvider
			specifiedTheme={data.theme ?? Theme.LIGHT}
			themeAction="/actions/set-theme"
		>
			{children}
		</ThemeProvider>
	);
};

import { themeSessionResolver } from "~/sessions/theme.server";
import type { Route } from "./+types/root";

// Return the theme from the session storage using the loader
export async function loader({ request }: Route.LoaderArgs) {
	
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme(),
	};
}

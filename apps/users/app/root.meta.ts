import type { Route } from "./+types/root";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "New React Router 7 App" },
		{ name: "description", content: "¡Welcome to React Router 7!" },
	];
};


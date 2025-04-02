import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData } from "remix-hook-form";
import LoginPage from "~/screens/login.page";
import type { Route } from "./+types";

import { z } from "@package/ui/lib/validators";

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email().min(1),
});

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: Route.ActionArgs) => {
	const {
		errors,
		data,
		receivedValues: defaultValues,
	} = await getValidatedFormData<FormData>(request, resolver);
	// The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
	if (errors) return { errors, defaultValues };
	// Do something with the data
	return data;
};

export function SignInIndex() {
	return <LoginPage />;
}

export default SignInIndex;

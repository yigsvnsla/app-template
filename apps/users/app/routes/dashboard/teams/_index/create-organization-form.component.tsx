import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@package/ui/components/form";
import { Input } from "@package/ui/components/input";
import type { z } from "@package/ui/lib/validators";
import type { FC, PropsWithChildren } from "react";
import type { useRemixForm } from "remix-hook-form";
import type { CreateOrganizationSchema } from "./create-organization-dialog.component";

interface CreateOrganizationFormProps extends PropsWithChildren {
	form: ReturnType<
		typeof useRemixForm<z.infer<typeof CreateOrganizationSchema>>
	>;
}

export const CreateOrganizationForm: FC<CreateOrganizationFormProps> = ({
	form,
}) => {
	return (
		<>
			<FormField
				name="name"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input
								placeholder="Insert organization name"
								required
								{...field}
								// {...form.register("email")}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="slug"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Slug</FormLabel>
						<FormControl>
							<Input
								placeholder="Insert organization slug"
								required
								{...form.register("slug", {})}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

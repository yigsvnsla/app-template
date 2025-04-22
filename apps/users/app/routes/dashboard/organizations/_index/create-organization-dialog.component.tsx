import { zodResolver } from "@hookform/resolvers/zod";
import { ApiPaths } from "@package/clients/better-auth.openapi";
import { Button } from "@package/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@package/ui/components/dialog";
import { Form as FormProvider } from "@package/ui/components/form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@package/ui/components/form";
import { Input } from "@package/ui/components/input";
import { Spinner } from "@package/ui/components/spinner";
import { z } from "@package/ui/lib/validators";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { clientLoader } from ".";

function toSlug(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD") // separa letras de sus acentos
		.replace(/\p{M}/gu, "") // elimina los acentos
		.replace(/[^a-z0-9\s-]/g, "") // elimina caracteres no deseados
		.trim()
		.replace(/\s+/g, "-") // reemplaza espacios por guiones
		.replace(/-+/g, "-"); // elimina múltiples guiones
}

export const CreateOrganizationSchema = z.object({
	name: z
		.string()
		.nonempty()
		.regex(/^[a-zA-Z0-9]+[a-zA-Z0-9\s]+[a-zA-Z0-9]$/),
	slug: z
		.string()
		.nonempty()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const resolver = zodResolver(CreateOrganizationSchema);

export const CreateOrganizationDialog: FC<PropsWithChildren> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);

	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { mutateAsync, isPending } = $betterAuthClient.useMutation(
		"post",
		ApiPaths.PostOrganizationCreate,
		{
			onSuccess: () => {
				setOpen(false);
			},
		},
	);

	const form = useRemixForm<z.infer<typeof CreateOrganizationSchema>>({
		mode: "onSubmit",
		resolver,
		defaultValues: {
			name: "my custom organization",
		},
		submitHandlers: {
			onValid: async ({ name, slug }) => {
				console.log({ name, slug });

				// toast.promise(mutateAsync({ body: { name, slug } }), {
				// 	loading: "Loading...",
				// 	success: "Login successful!",
				// 	error: (error) => error.message,
				// });
			},
		},
	});

	function preventAutoFocus(e: Event): void {
		e.preventDefault();
	}

	useEffect(() => {});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={preventAutoFocus}
				className="sm:max-w-[425px]"
			>
				{/**
				 * TODO: DESPUES ESTO QUE SE MIGRE A UNA PAGINA INDEPENDIENTE PORQUE TIENE MAS PROPS EL ENDPOINT
				 */}
				<FormProvider {...form}>
					<Form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Insert organization name"
											required
											onChange={(e) => {
												field.onChange(e);
												form.setValue("slug", toSlug(e.target.value));
											}}
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
											{...field}
											required
											placeholder="Insert organization slug"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="submit"
								className="w-full"
								disabled={isPending || !form.formState.isValid}
							>
								{isPending ? <Spinner /> : "Save changes"}
							</Button>
						</DialogFooter>
					</Form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

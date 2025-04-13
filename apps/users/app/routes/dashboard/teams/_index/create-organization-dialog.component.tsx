import { zodResolver } from "@hookform/resolvers/zod";
import { betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
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
import { toast } from "@package/ui/components/sonner";
import { Spinner } from "@package/ui/components/spinner";
import { useIsMobile } from "@package/ui/hooks/use-mobile";
import { z } from "@package/ui/lib/validators";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { clientLoader } from ".";
import { CreateOrganizationForm } from "./create-organization-form.component";

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
		.regex(/^[a-zA-Z0-9]+$/, "dsadsa")
		.nonempty(),
	slug: z
		.string()
		.transform(toSlug)
		.refine((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), {
			message:
				"Slug inválido: solo letras minúsculas, números y guiones entre palabras.",
		})
		.refine(async (slug) => {
			const { data } = await betterAuthClient.POST(
				ApiPaths.PostOrganizationCheckslug,
				{
					body: { slug },
				},
			);

			console.log();
			
			return true;
		}),
});

export const resolver = zodResolver(CreateOrganizationSchema);

export const CreateOrganizationDialog: FC<PropsWithChildren> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);

	const isMobile = useIsMobile();

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
			name: "org 2",
			slug: "org-2",
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

	const organizationName = form.watch("name");

	useEffect(() => {
		const slug = organizationName
			.toLowerCase()
			.normalize("NFD") // separa letras de sus acentos
			.replace(/\p{M}/gu, "") // elimina los acentos
			.replace(/[^a-z0-9\s-]/g, "") // elimina caracteres no deseados
			.trim()
			.replace(/\s+/g, "-") // reemplaza espacios por guiones
			.replace(/-+/g, "-"); // elimina múltiples guiones

		form.setValue("slug", slug);
	}, [form.setValue, organizationName]);

	function preventAutoFocus(e: Event): void {
		if (!isMobile) e.preventDefault();
	}

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
						<CreateOrganizationForm form={form} />
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

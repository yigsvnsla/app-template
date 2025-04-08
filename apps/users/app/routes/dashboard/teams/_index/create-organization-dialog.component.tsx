import { zodResolver } from "@hookform/resolvers/zod";
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
import { type FC, type PropsWithChildren, useState } from "react";
import { Form, useLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { clientLoader } from ".";
import { CreateOrganizationForm } from "./create-organization-form.component";

export const CreateOrganizationSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
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
				toast.promise(mutateAsync({ body: { name, slug } }), {
					loading: "Loading...",
					success: "Login successful!",
					error: (error) => error.message,
				});
			},
		},
	});

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

import { zodResolver } from "@hookform/resolvers/zod";
import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/api/better-auth.openapi";
import { $filesClient } from "@package/api/files.client";
import { ApiPaths as FilesApiPaths } from "@package/api/files.openapi";

import {
	Content,
	ContentHeader,
	ContentLabel,
} from "@package/ui/components/custom/content";
import { toast } from "@package/ui/components/sonner";
import { z } from "@package/ui/lib/validators";

import RMC_STYLES from "react-mobile-cropper/dist/style.css?url";

import { useRemixForm } from "remix-hook-form";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@package/ui/components/avatar";
import { Button } from "@package/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@package/ui/components/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormProvider,
} from "@package/ui/components/form";
import { Input } from "@package/ui/components/input";
import { getAvatarInitials } from "@package/ui/lib/utils";
import { Form } from "react-router";
import type { Route } from "./+types";

import { LuUpload } from "@package/ui/icons";
import { getMimeType } from "advanced-cropper/extensions/mimes";
import { useEffect, useRef, useState } from "react";
import { Cropper, type CropperRef } from "react-mobile-cropper";
const CreateUserFormSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "Name must be at least 2 characters long" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(9, { message: "Password must be at least 6 characters long" })
			.regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

export async function clientLoader() {
	// During client-side navigations, we hit our exposed API endpoints directly
	return { $betterAuthClient };
}

export default function UserCreateIndex() {
	const cropperRef = useRef<CropperRef>(null);

	const [image, setImage] = useState<{
		type?: string;
		src: string;
	} | null>(null);

	const { mutateAsync, isPending } = $betterAuthClient.useMutation(
		"post",
		BetterAuthApiPaths.createUser,
	);

	const form = useRemixForm<z.infer<typeof CreateUserFormSchema>>({
		mode: "onSubmit",
		resolver: zodResolver(CreateUserFormSchema),
		defaultValues: {
			name: "Test User",
			email: `${self.crypto.randomUUID()}@example.com`,
			password: "123456789",
			confirmPassword: "123456789",
		},
		submitHandlers: {
			onValid: async (form) => {
				toast.promise(
					mutateAsync({
						body: {
							name: form.name,
							email: form.email,
							password: form.password,

							// role: "user", // this can also be an array for multiple roles (e.g. ["user", "sale"])
							data: {
								image: "dsadsadsadsa",
								// any additional on the user table including plugin fields and custom fields
								customField: "customValue",
							} as unknown as string, // TODO: CREATE ISSUE IN BETTER AUTH FOR THIS
						},
					}),
					{
						loading: "Loading...",
						success: "Create successful!",
						error: (error) => error.message,
					},
				);
			},
		},
	});

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const blob = URL.createObjectURL(file);
			const typeFallback = file.type;
			const reader = new FileReader();
			reader.onload = (e) =>
				setImage({
					src: blob,
					type: getMimeType(e.target?.result, typeFallback),
				});
			reader.readAsArrayBuffer(file);
		}
	};

	const onChangeCropper = (cropper: CropperRef) => {
		// console.log(cropper.getCoordinates(), cropper.getCanvas());
	};

	const onUploadFile = () => {
		const canvas = cropperRef.current?.getCanvas();
		if (canvas) {
			const form = new FormData();
			canvas.toBlob((blob) => {
				if (blob) {
					form.append("file", blob);
					fetch("http://example.com/upload/", {
						method: "POST",
						body: form,
					});
				}
			}, "image/jpeg");
		}
	};

	useEffect(() => {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		return () => {
			if (image?.src) {
				URL.revokeObjectURL(image.src);
			}
		};
	}, [image]);

	return (
		<Content>
			<ContentHeader>
				<ContentLabel type="title">Create User</ContentLabel>
				<ContentLabel type="caption">form for create users</ContentLabel>
			</ContentHeader>

			<section>
				<FormProvider {...form}>
					<Form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
						<section>
							<Dialog>
								<DialogTrigger asChild>
									{/* TODO: REPARAR OVERLAY "CAMBIAR"*/}
									<div className="flex flex-col items-center mb-6">
										<div className="relative cursor-pointer group mb-2">
											<Avatar className="size-24">
												<AvatarImage src={image?.src} />
												<AvatarFallback>
													{getAvatarInitials(form.watch("name") ?? "")}
												</AvatarFallback>
											</Avatar>
											<div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
												<span className="text-white text-xs font-medium select-none">
													Cambiar
												</span>
											</div>
										</div>
									</div>
								</DialogTrigger>
								<DialogContent className="rounded-2xl">
									<DialogHeader>
										<DialogTitle>Edit profile</DialogTitle>
										<DialogDescription>
											Make changes to your profile here. Click save when you're
											done.
										</DialogDescription>
									</DialogHeader>
									{!image ? (
										<div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg border-muted-foreground/25 p-12">
											<LuUpload className="h-10 w-10 text-muted-foreground mb-2" />
											<p className="text-sm text-muted-foreground text-center mb-4">
												Arrastra y suelta una imagen o haz clic para seleccionar
											</p>
											<Button variant="outline" asChild>
												<label className="cursor-pointer">
													Seleccionar imagen
													<input
														type="file"
														className="hidden"
														accept="image/*"
														onChange={onFileChange}
													/>
												</label>
											</Button>
										</div>
									) : (
										<Cropper
											className="cropper rounded max-h-96"
											src={image?.src}
											ref={cropperRef}
											onChange={onChangeCropper}
											stencilProps={{
												aspectRatio: 1 / 1,
												movable: false,
												resizable: false,
											}}
										/>
									)}
									<DialogFooter className="sm:justify-between gap-4">
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<DialogClose asChild>
											<Button onClick={onUploadFile}>Acept</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</section>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input type="email" placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>confirmPassword</FormLabel>
									<FormControl>
										<Input type="password" placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<section>
							<Button type="submit" variant="outline">
								submit
							</Button>
						</section>
					</Form>
				</FormProvider>
			</section>
		</Content>
	);
}

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: RMC_STYLES },
];

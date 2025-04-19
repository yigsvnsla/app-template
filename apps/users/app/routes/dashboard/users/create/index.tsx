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

import { Label } from "@package/ui/components/label";
import { LuUpload } from "@package/ui/icons";
import { getMimeType } from "advanced-cropper/extensions/mimes";
import { useEffect, useRef, useState } from "react";
import type { CropperPreviewRef } from "react-advanced-cropper";
import { Cropper, type CropperRef } from "react-mobile-cropper";
import { DialogCropper } from "./dialog-cropper.client";

export default function UserCreateIndex() {
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

	const previewRef = useRef<CropperPreviewRef>(null);
	const cropperRef = useRef<CropperRef>(null);

	const [image, setImage] = useState<{
		type?: string;
		src: string;
	} | null>(null);

	const [previewImg, setPreviewImg] = useState<Blob | null>(null);

	const createUserMutation = $betterAuthClient.useMutation(
		"post",
		BetterAuthApiPaths.createUser,
	);

	const uploadImageMutation = $filesClient.useMutation(
		"post",
		FilesApiPaths.postFilesUpload,
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
			onValid: (form) => {
				toast.promise(createUserHandler(form), {
					loading: "Loading...",
					success: "Create successful!",
					error: (error) => error.message,
				});
			},
		},
	});

	function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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
	}

	function onCrop() {
		if (cropperRef.current) {
			cropperRef.current.getCanvas()?.toBlob((blob) => {
				setPreviewImg(blob);
			}, "image/jpeg");
		}
	}

	async function createUserHandler(form: z.infer<typeof CreateUserFormSchema>) {
		const uploadMutate = await uploadImageMutation.mutateAsync({
			headers: {
				"Content-Type": "multipart/form-data",
			},
			bodySerializer: (body) => {
				const formData = new FormData();
				formData.append("file", body.file);
				formData.append("name", "custom name for file");
				console.log({ body });

				console.log("previewImg", formData.get("file"));
				console.log("serialized", [...formData.entries()]);

				return formData;
			},
			body: {
				file: new File([previewImg as Blob], "image.jpeg", {
					type: "application/octet-stream",
				}) as unknown as string,
			},
		});

		if (!uploadMutate) throw new Error("Error uploading file");

		const userMutation = await createUserMutation.mutateAsync({
			body: {
				name: form.name,
				email: form.email,
				password: form.password,
				data: {
					image: uploadMutate.path,
				} as unknown as string, // TODO: CREATE BETTER AUTH ISSUE
			},
		});

		if (!userMutation.user) throw new Error("Error creating user");
	}

	useEffect(() => {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		return () => {
			if (image?.src) URL.revokeObjectURL(image.src);
		};
	}, [image]);

	return (
		<Content>
			<ContentHeader>
				<ContentLabel type="title">Create User</ContentLabel>
				<ContentLabel type="caption">form for create users</ContentLabel>
			</ContentHeader>
			<DialogCropper />

			<FormProvider {...form}>
				<Form onSubmit={form.handleSubmit} className="grid grid-cols-1 gap-4">
					<div className="flex flex-col items-center gap-2 col-span-full">
						<span className="capitalize font-semibold text-xl">
							Image Profile
						</span>
						<Avatar className="size-24">
							<AvatarImage
								src={previewImg ? URL.createObjectURL(previewImg) : ""}
							/>
							<AvatarFallback>
								{getAvatarInitials(form.watch("name") ?? "")}
							</AvatarFallback>
						</Avatar>

						<Dialog>
							<DialogTrigger asChild>
								<Button
									className="capitalize"
									size="sm"
									type="button"
									variant="outline"
								>
									set image
								</Button>
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
										<Button asChild variant="outline" size="sm">
											<Label className="cursor-pointer">
												Seleccionar imagen
												<Input
													type="file"
													className="hidden"
													accept="image/*"
													onChange={onFileChange}
												/>
											</Label>
										</Button>
									</div>
								) : (
									<>
										<Cropper
											className="cropper rounded h-96"
											src={image?.src}
											ref={cropperRef}
											stencilProps={{
												aspectRatio: 1 / 1,
												movable: false,
												resizable: false,
											}}
										/>
										<Button asChild variant="outline" size="sm">
											<Label className="cursor-pointer">
												Seleccionar imagen
												<Input
													type="file"
													className="hidden"
													accept="image/*"
													onChange={onFileChange}
												/>
											</Label>
										</Button>
									</>
								)}
								<DialogFooter className="sm:justify-between gap-4">
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button onClick={onCrop}>Acept</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="col-span-full">
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
							<FormItem className="col-span-full">
								<FormLabel>email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="example@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="col-span-full">
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
							<FormItem className="col-span-full">
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
		</Content>
	);
}

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: RMC_STYLES },
];

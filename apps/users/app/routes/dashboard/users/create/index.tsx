import { zodResolver } from "@hookform/resolvers/zod";
import { $betterAuthClient } from "@package/api/better-auth.client";
import {
	ApiPaths as BetterAuthApiPaths,
	type components,
} from "@package/api/better-auth.openapi";
import { $filesClient } from "@package/api/files.client";
import { ApiPaths as FilesApiPaths } from "@package/api/files.openapi";

import { Content } from "@package/ui/components/custom/content";
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
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormProvider,
} from "@package/ui/components/form";
import { Input } from "@package/ui/components/input";
import { Form } from "react-router";
import type { Route } from "./+types";

import { Badge } from "@package/ui/components/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@package/ui/components/card";
import { Label } from "@package/ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@package/ui/components/select";
import { Separator } from "@package/ui/components/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@package/ui/components/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@package/ui/components/tooltip";
import {
	LuCirclePlus,
	LuInfo,
	LuUpload,
	LuUser,
	LuUserCog,
} from "@package/ui/icons";
import { type PropsWithChildren, useState } from "react";

import { PasswordInput } from "@package/ui/components/custom/input-password";
import { getAvatarInitials } from "@package/ui/lib/utils";
import { DialogCropper, DialogCropperStore } from "./dialog-cropper.client";

const CreateUserFormSchema = z.object({
	role: z.string().optional(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(9, { message: "Password must be at least 6 characters long" })
		.regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: RMC_STYLES },
];

export interface UserCreateIndexProps {
	userImpersonated: {
		session?: components["schemas"]["Session"];
		user?: components["schemas"]["User"];
	};
}

export default function UserCreateIndex({
	userImpersonated,
}: UserCreateIndexProps) {
	const { session, user } = userImpersonated;

	const [activeTab, setActiveTab] = useState("info");

	const setDialogOpen = DialogCropperStore((state) => state.setOpen);
	const imageCropped = DialogCropperStore((state) => state.imageCropped);

	const createUserMutation = $betterAuthClient.useMutation(
		"post",
		BetterAuthApiPaths.createUser,
	);

	const uploadMutation = $filesClient.useMutation(
		"post",
		FilesApiPaths.postFilesUpload,
	);

	const form = useRemixForm<z.infer<typeof CreateUserFormSchema>>({
		mode: "onSubmit",
		resolver: zodResolver(CreateUserFormSchema),
		defaultValues: {
			name: user?.name ?? "",
			email: user?.email ?? `${crypto.randomUUID()}@example.com`,
			role: user?.role ?? "user",
		},
		submitHandlers: {
			onValid: async (form) => {
				let imageUrl = null;
				if (imageCropped) {
					const { path } = await toast
						.promise(
							uploadMutation.mutateAsync({
								body: {
									file: new File([imageCropped.src as Blob], "image.jpeg", {
										type: imageCropped.type,
									}) as unknown as string, // TODO: CREATE BETTER AUTH ISSUE,
								},
								bodySerializer: (body) => {
									const formData = new FormData();
									formData.set("file", body.file);
									return formData;
								},
							}),
							{
								loading: "Upload File...",
								success: "Upload successful!",
								error: (error) => error.message,
							},
						)
						.unwrap();
					imageUrl = path;
				}

				toast.promise(
					createUserMutation.mutateAsync({
						body: {
							name: form.name,
							email: form.email,
							password: form.password,
							data: {
								image: imageUrl,
							} as unknown as string, // TODO: CREATE BETTER AUTH ISSUE
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

	return (
		<Content>
			<FormProvider {...form}>
				<Form onSubmit={form.handleSubmit}>
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Gestión de Usuario</CardTitle>
									<CardDescription>
										Complete la información para crear un nuevo usuario en el
										sistema
									</CardDescription>
								</div>
								<div className="flex items-center space-x-2">
									<Badge variant="outline" className="text-xs font-normal">
										ID: Nuevo Usuario
									</Badge>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
								{/* Columna de imagen de perfil */}
								<div className="flex flex-col items-center space-y-4 p-6 bg-muted/50 rounded-lg">
									<div className="text-center mb-2">
										<h3 className="font-medium mb-1">Imagen de Perfil</h3>
										<p className="text-xs text-muted-foreground">
											Seleccione una imagen para el usuario
										</p>
									</div>

									<button
										type="button"
										onClick={() => setDialogOpen(true)}
										className="relative cursor-pointer group my-4"
									>
										<Avatar className="w-32 h-32 border-4 border-background shadow">
											<AvatarImage
												src={
													imageCropped
														? URL.createObjectURL(imageCropped.src)
														: ""
												}
												alt="Profile"
											/>
											<AvatarFallback className="bg-muted">
												{form.watch("name") ? (
													getAvatarInitials(form.watch("name"))
												) : (
													<LuCirclePlus className="w-10 h-10 text-muted-foreground" />
												)}
											</AvatarFallback>
										</Avatar>
										<div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
											<span className="text-white text-xs font-medium">
												Cambiar
											</span>
										</div>
									</button>

									<Button
										type="button"
										variant="secondary"
										size="sm"
										onClick={() => setDialogOpen(true)}
										className="mt-2 cursor-pointer"
									>
										Subir imagen <LuUpload />
									</Button>

									<Separator className="my-4" />

									<div className="w-full space-y-4">
										<div className="space-y-2 text-sm">
											<Label className="text-xs font-medium text-muted-foreground">
												Estado
											</Label>
											<Select defaultValue="active">
												<SelectTrigger>
													<SelectValue placeholder="Seleccionar estado" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="active">Activo</SelectItem>
													<SelectItem value="inactive">Inactivo</SelectItem>
													<SelectItem value="pending">Pendiente</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2 text-sm hidden">
											<Label className="text-xs font-medium text-muted-foreground">
												Fecha de creación
											</Label>
											<div className="text-sm py-2 px-3 rounded-md bg-muted">
												{new Date().toLocaleDateString()}
											</div>
										</div>
									</div>
								</div>

								{/* Columna de datos del usuario */}
								<div>
									<Tabs
										value={activeTab}
										onValueChange={setActiveTab}
										className="w-full"
									>
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger
												value="info"
												className="flex items-center gap-2"
											>
												<LuUser className="h-4 w-4" />
												<span>Información Personal</span>
											</TabsTrigger>
											<TabsTrigger
												value="access"
												className="flex items-center gap-2"
											>
												<LuUserCog className="h-4 w-4" />
												<span>Acceso y Roles</span>
											</TabsTrigger>
										</TabsList>

										<TabsContent value="info" className="space-y-6 pt-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<FormField
													control={form.control}
													name="name"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Name Complete</FormLabel>
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
														<FormItem>
															<FormLabel>Email Address</FormLabel>
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
											</div>

											{/*

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="department">Departamento</Label>
													<Select
													// value={formData.department}
													// onValueChange={handleDepartmentChange}
													>
														<SelectTrigger id="department">
															<SelectValue placeholder="Seleccionar departamento" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="it">Tecnología</SelectItem>
															<SelectItem value="hr">
																Recursos Humanos
															</SelectItem>
															<SelectItem value="finance">Finanzas</SelectItem>
															<SelectItem value="marketing">
																Marketing
															</SelectItem>
															<SelectItem value="operations">
																Operaciones
															</SelectItem>
														</SelectContent>
													</Select>
												</div>

												<div className="space-y-2">
													<Label htmlFor="position">Cargo</Label>
													<Input
														id="position"
														name="position"
														// value={formData.position}
														// onChange={handleInputChange}
														placeholder="Cargo o posición"
													/>
												</div>
											</div>

											*/}
										</TabsContent>

										<TabsContent value="access" className="space-y-6 pt-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{/* USER PASSWORD SELECT */}
												<FormField
													control={form.control}
													name="password"
													render={({ field }) => (
														<FormItem>
															<div className="relative m-0">
																<FormLabel>Password</FormLabel>
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger asChild>
																			<Button
																				type="button"
																				variant="ghost"
																				size="icon"
																				className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent"
																			>
																				<LuInfo className="h-4 w-4" />
																			</Button>
																		</TooltipTrigger>
																		<TooltipContent>
																			<p className="text-xs">
																				La contraseña debe tener al menos 8
																				caracteres
																			</p>
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
															</div>
															<FormControl>
																<PasswordInput
																	type="password"
																	placeholder="*********"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												{/* USER ROL SELECT */}
												<FormField
													control={form.control}
													name="role"
													render={({ field }) => (
														<FormItem>
															<FormLabel>User Rol</FormLabel>
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																>
																	<SelectTrigger id="role">
																		<SelectValue placeholder="Selecciona un rol" />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="user">
																			Usuario
																		</SelectItem>
																		<SelectItem value="admin">
																			Administrador
																		</SelectItem>
																	</SelectContent>
																</Select>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>

											<div className="bg-muted/50 p-4 rounded-lg border">
												{/* <div className="flex items-center space-x-2 mb-3">
													<Checkbox
														id="multipleRoles"
														// checked={multipleRoles}
														// onCheckedChange={(checked) =>
														// 	handleMultipleRolesChange(!!checked)
														// }
													/>
													<Label
														htmlFor="multipleRoles"
														className="font-medium"
													>
														Asignar múltiples roles
													</Label>
												</div> */}

												{/*multipleRoles && (
											<div className="pl-6">
												<Label className="text-sm text-muted-foreground mb-2 block">
													Seleccione los roles aplicables:
												</Label>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
													{[
														"user",
														"sale",
														"admin",
														"manager",
														"finance",
														"hr",
													].map((role) => (
														<div
															key={role}
															className="flex items-center space-x-2"
														>
															<Checkbox
																id={`role-${role}`}
																// checked={selectedRoles.includes(role)}
																// onCheckedChange={() => handleRoleToggle(role)}
															/>
															<Label
																htmlFor={`role-${role}`}
																className="text-sm capitalize"
															>
																{role}
															</Label>
														</div>
													))}
												</div>
											</div>
										)*/}
											</div>
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex justify-between border-t p-6">
							<Button
								onClick={() => form.reset()}
								type="button"
								variant="outline"
							>
								Cancelar
							</Button>
							<Button type="submit">Crear Usuario</Button>
						</CardFooter>
					</Card>
				</Form>
			</FormProvider>

			<DialogCropper />
		</Content>
	);
}

/**
 * TODO: REMOVE THIS FUNCTION
 * 	// This function is used to upload the image to the server
 * 	// and return the URL of the uploaded image.
 * 	// It is not used in this component, but it is here for reference.
 * 	// You can use it in your own code if you need to upload images.
 * 	async function uploadImagePic(file: Nullable<ImageCropped>) {
		if (!file) return;
		const { error, data } = await filesClient.POST(
			FilesApiPaths.postFilesUpload,
			{
				body: {
					file: new File([file.src as Blob], "image.jpeg", {
						type: file.type,
					}) as unknown as string,
				},
				bodySerializer: (body) => {
					const formData = new FormData();
					formData.set("file", body.file);
					return formData;
				},
			},
		);
		if (error) throw new Error("Error uploading file", { cause: error });
		return data;
	}

 */

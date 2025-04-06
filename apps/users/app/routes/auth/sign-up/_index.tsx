import { zodResolver } from "@hookform/resolvers/zod";
import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
import { Button } from "@package/ui/components/button";
import { PasswordInput } from "@package/ui/components/custom/input-password";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormProvider,
} from "@package/ui/components/form";
import { Input } from "@package/ui/components/input";
import { toast } from "@package/ui/components/sonner";
import { Spinner } from "@package/ui/components/spinner";
import { LuGithub } from "@package/ui/icons";
import { z } from "@package/ui/lib/validators";
import { GalleryVerticalEnd } from "lucide-react";
import { Form, Link, useLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";

const SignUpFormSchema = z
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

export type FormData = z.infer<typeof SignUpFormSchema>;

export const resolver = zodResolver(SignUpFormSchema);

export async function clientLoader() {
	// During client-side navigations, we hit our exposed API endpoints directly
	return { $betterAuthClient };
}

export function SignUpIndex() {
	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { mutateAsync, isPending } = $betterAuthClient.useMutation(
		"post",
		ApiPaths.PostSignupEmail,
	);

	const form = useRemixForm<z.infer<typeof SignUpFormSchema>>({
		mode: "onSubmit",
		resolver,
		defaultValues: {
			name: "Jesus Christ",
			email: "exmaple1@example.com",
			password: "123456789",
			confirmPassword: "123456789",
		},
		submitHandlers: {
			onValid: async (form) => {
				toast.promise(
					mutateAsync({
						body: {
							email: form.email,
							password: form.password,
							name: form.name,
						},
					}),
					{
						loading: "Loading...",
						success: (data) => {
							console.log(data);
							return "Register successful!";
						},
						error: (error) => error.message,
					},
				);
			},
		},
	});

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="#" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4 dark:text-white" />
						</div>
						Acme Inc.
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<div className="grid gap-6">
							<FormProvider {...form}>
								<Form
									onSubmit={form.handleSubmit}
									className="flex flex-col gap-6"
								>
									<div className="flex flex-col items-center gap-2 text-center">
										<h1 className="text-2xl font-bold">
											Create to your account
										</h1>
										<p className="text-balance text-sm text-muted-foreground">
											Enter your information below to to your account
										</p>
									</div>
									<div className="grid gap-4">
										{/* Name Field */}
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="name">Full Name</FormLabel>
													<FormControl>
														<Input
															id="name"
															placeholder="John Doe"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Email Field */}
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="email">Email</FormLabel>
													<FormControl>
														<Input
															id="email"
															placeholder="johndoe@mail.com"
															type="email"
															autoComplete="email"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Password Field */}
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="password">Password</FormLabel>
													<FormControl>
														<PasswordInput
															id="password"
															placeholder="******"
															autoComplete="new-password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Confirm Password Field */}
										<FormField
											control={form.control}
											name="confirmPassword"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="confirmPassword">
														Confirm Password
													</FormLabel>
													<FormControl>
														<PasswordInput
															id="confirmPassword"
															placeholder="******"
															autoComplete="new-password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button
											disabled={isPending || !form.formState.isValid}
											type="submit"
											className="w-full"
										>
											{isPending ? <Spinner /> : "Register"}
										</Button>
									</div>
								</Form>
							</FormProvider>

							{/* SEPARATOR */}
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>

							<Button variant="outline" className="w-full">
								<LuGithub className="size-4" />
								Login with GitHub
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src="/placeholder.svg"
					alt="logotype the product"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}

export default SignUpIndex;

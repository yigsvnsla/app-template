import { zodResolver } from "@hookform/resolvers/zod";
import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
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
import { Label } from "@package/ui/components/label";
import { toast } from "@package/ui/components/sonner";
import { Spinner } from "@package/ui/components/spinner";
import { LuGithub } from "@package/ui/icons";
import { cn } from "@package/ui/lib/utils";
import { z } from "@package/ui/lib/validators";
import { GalleryVerticalEnd } from "lucide-react";
import { Form, Link, useLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";

export const LoginSchema = z.object({
	password: z.string().min(1),
	email: z.string().email().min(1),
});

export type FormData = z.infer<typeof LoginSchema>;

export const resolver = zodResolver(LoginSchema);

export async function clientLoader() {
	// During client-side navigations, we hit our exposed API endpoints directly
	return { $betterAuthClient };
}

export function SignUpIndex() {
	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { mutateAsync, isPending } = $betterAuthClient.useMutation(
		"post",
		ApiPaths.PostSigninEmail,
	);

	const form = useRemixForm<z.infer<typeof LoginSchema>>({
		mode: "onSubmit",
		resolver,
		submitHandlers: {
			onValid: async ({ email, password }) => {
				toast.promise(mutateAsync({ body: { email, password } }), {
					loading: "Loading...",
					success: (data) => {
						console.log(data);
						return "Login successful!";
					},
					error: (error) => error.message,
				});
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
						<FormProvider {...form}>
							<Form
								onSubmit={form.handleSubmit}
								className={cn("flex flex-col gap-6")}
							>
								<div className="flex flex-col items-center gap-2 text-center">
									<h1 className="text-2xl font-bold">Login to your account</h1>
									<p className="text-balance text-sm text-muted-foreground">
										Enter your email below to login to your account
									</p>
								</div>
								<div className="grid gap-6">
									<div className="grid gap-2">
										<FormField
											name="email"
											control={form.control}
											render={() => (
												<FormItem>
													<FormLabel>email</FormLabel>
													<FormControl>
														<Input
															placeholder="example@domain.com"
															required
															{...form.register("email")}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="password"
											render={() => (
												<FormItem>
													<FormLabel>
														<div className="flex items-center">
															<Label htmlFor="password">Password</Label>
															<Link
																to=".."
																className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
															>
																Forgot your password?
															</Link>
														</div>
													</FormLabel>
													<FormControl>
														<Input
															required
															type="password"
															{...form.register("password")}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											disabled={isPending || !form.formState.isValid}
											type="submit"
											className="w-full dark:text-white"
										>
											{isPending ? <Spinner className="text-white" /> : "Login"}
										</Button>
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
									<div className="text-center text-sm">
										Don&apos;t have an account?{" "}
										<Link
											to="../sign-up"
											relative="path"
											className="underline underline-offset-4"
										>
											to up
										</Link>
									</div>
								</div>
							</Form>
						</FormProvider>
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

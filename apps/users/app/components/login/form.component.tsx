import { Button } from "@package/ui/components/button";
import { Input } from "@package/ui/components/input";
import { Label } from "@package/ui/components/label";
import { cn } from "@package/ui/lib/utils";
import { z } from "@package/ui/lib/validators";

import { Link } from "react-router";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormProvider,
} from "@package/ui/components/form";

import { LuGithub } from "@package/ui/icons/index";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {



	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							to="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" className="w-full dark:text-white">
					Login
				</Button>
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
				<Button variant="outline" className="w-full">
        <LuGithub className="size-4"/>
					Login with GitHub
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="#" className="underline underline-offset-4">
					to up
				</Link>
			</div>
		</form>
	);
}

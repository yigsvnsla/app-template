/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SQZ6ZH0paC5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import type { FC, HTMLAttributes } from "react";
import { Link } from "react-router";

interface ErrorTemplateProps {
	message: string;
	details: string;
	stack?: string;
}

export const ErrorTemplate: FC<ErrorTemplateProps> = ({
	message,
	details,
	stack,
}) => {
	return (
		<main
			key="1"
			className="flex h-[100dvh] w-full flex-col items-center justify-center gap-6 px-4 md:px-6"
		>
			<div className="flex max-w-lg flex-col items-center justify-center gap-6">
				<BotIcon className="h-40 w-40 text-gray-500 dark:text-gray-400" />
				<div className="space-y-4 text-center">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
						{message}
					</h1>
					<p className="text-gray-500 dark:text-gray-400">{details}</p>
				</div>
				{stack && (
					<pre className="w-full p-4 overflow-x-auto">
						<code>{stack}</code>
					</pre>
				)}
				<Link
					className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
					to=".."
					prefetch="intent"
				>
					Go back home
				</Link>
			</div>
		</main>
	);
};

const BotIcon: FC<HTMLAttributes<SVGSVGElement>> = ({ ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>OpenAssistantGPT</title>
			<path d="M12 8V4H8" />
			<rect width="16" height="12" x="4" y="8" rx="2" />
			<path d="M2 14h2" />
			<path d="M20 14h2" />
			<path d="M15 13v2" />
			<path d="M9 13v2" />
		</svg>
	);
};

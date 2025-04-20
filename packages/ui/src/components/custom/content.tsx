import { cn } from "@package/ui/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { FC, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const Content: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
	children,
	className,
}) => {
	return (
		<section className={cn("container p-4 space-y-4 mx-auto", className)}>
			{children}
		</section>
	);
};

Content.displayName = "Content";

const ContentHeader: FC<
	PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>
> = ({ children, className }) => {
	return (
		<header className={cn("flex flex-col pb-4 space-y-2", className)}>{children}</header>
	);
};

ContentHeader.displayName = "ContentHeader";

// -------------------------------------------------------------------
const ContentLabelVariants = cva("font-medium tracking-tight capitalize", {
	variants: {
		type: {
			title: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50",
			subtitle: "text-xl md:text-2xl text-gray-700 dark:text-gray-300",
			caption: "text-sm tracking-wide text-gray-500 dark:text-gray-400",
			overline:
				"text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400",
		},
	},
	defaultVariants: {
		type: "title",
	},
});

const titleElementMap: Record<
	NonNullable<VariantProps<typeof ContentLabelVariants>["type"]>,
	"h1" | "h2" | "p" | "span"
> = {
	title: "h1",
	subtitle: "h2",
	caption: "p",
	overline: "span",
};

export type ContentLabelProps = PropsWithChildren<
	HTMLAttributes<HTMLElement> & VariantProps<typeof ContentLabelVariants>
>;

const ContentLabel: FC<ContentLabelProps> = ({
	children,
	className,
	type = "title",
	...props
}) => {
	const Element = titleElementMap[type ?? "title"];
	return (
		<Element
			className={twMerge(ContentLabelVariants({ type, className }))}
			{...(props as HTMLAttributes<HTMLElement>)} // Type assertion segura
		>
			{children}
		</Element>
	);
};

ContentLabel.displayName = "ContentLabel";
// -------------------------------------------------------------------
export { Content, ContentHeader, ContentLabel };

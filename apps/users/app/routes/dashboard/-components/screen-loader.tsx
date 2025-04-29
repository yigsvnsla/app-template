import { Content, ContentLabel } from "@package/ui/components/custom/content";
import { Spinner } from "@package/ui/components/spinner";
import { LuGalleryHorizontalEnd } from "@package/ui/icons";

export default function ScreenLoader() {
	return (
		<Content className="h-svh flex">
			<section className="my-auto mx-auto flex flex-col justify-center items-center space-y-4">
				<div className="flex justify-center gap-2 md:justify-start">
					<span className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<LuGalleryHorizontalEnd className="size-4 dark:text-white" />
						</div>
						Acme Inc.
					</span>
				</div>
				<div>
					<ContentLabel type="title" className="text-center capitalize">
						Hi' 👋
					</ContentLabel>
					<ContentLabel type="subtitle" className="text-center capitalize">
						the app is loading
					</ContentLabel>
				</div>
				<Spinner />
			</section>
		</Content>
	);
}

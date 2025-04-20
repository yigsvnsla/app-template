import { Button } from "@package/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@package/ui/components/dialog";
import { Input } from "@package/ui/components/input";
import { Label } from "@package/ui/components/label";
import { LuUpload } from "@package/ui/icons";
import { getMimeType } from "advanced-cropper/extensions/mimes";
import { useRef } from "react";
import type { Nullable } from "react-advanced-cropper";
import { Cropper, type CropperRef } from "react-mobile-cropper";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ImageCropped {
	src: File;
	type: string;
}

export interface DialogCropperStore {
	open: boolean;
	image: Nullable<ImageCropped>;
	imageCropped: Nullable<ImageCropped>;
	setOpen: (open: boolean) => void;
	setImage: (image: Nullable<ImageCropped>) => void;
	setImageCropped: (imageCropped: Nullable<ImageCropped>) => void;
}

export const DialogCropperStore = create<DialogCropperStore>()(
	devtools(
		// persist(
		(set) => ({
			image: null,
			imageCropped: null,
			open: false,
			setImageCropped: (imageCropped) => set(() => ({ imageCropped })),
			setImage: (image) => set(() => ({ image })),
			setOpen: (open) => set(() => ({ open })),
		}),
		{
			name: "dialog-cropper-store", // name of the item in the storage (must be unique)
		},
		// ),
	),
);

function onFileChange(setImage: DialogCropperStore["setImage"]) {
	return (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (e) =>
				setImage({
					src: file,
					type: getMimeType(e.target?.result, file.type) ?? "",
				});
			reader.readAsArrayBuffer(file);
		}
	};
}

function onCrop(
	cropperRef: React.RefObject<CropperRef | null>,
	setImageCropped: DialogCropperStore["setImageCropped"],
): () => void {
	return () => {
		const mimeType = "image/jpeg";
		if (cropperRef.current) {
			const { getCanvas } = cropperRef.current;
			const setBlob: BlobCallback = (blob) => {
				if (!blob) return;
				setImageCropped({
					src: new File([blob], "image.jpg", {
						type: mimeType,
					}),
					type: mimeType,
				});
			};
			getCanvas()?.toBlob(setBlob, mimeType);
		}
	};
}
export const DialogCropper = () => {
	const cropperRef = useRef<CropperRef>(null);
	const image = DialogCropperStore((state) => state.image);
	const dialogOpen = DialogCropperStore((state) => state.open);

	const setDialogOpen = DialogCropperStore((state) => state.setOpen);
	const setImage = DialogCropperStore((state) => state.setImage);
	const setImageCropped = DialogCropperStore((state) => state.setImageCropped);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogContent className="rounded-2xl">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
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
									onChange={onFileChange(setImage)}
								/>
							</Label>
						</Button>
					</div>
				) : (
					<>
						<Cropper
							className="cropper rounded h-96"
							src={URL.createObjectURL(image.src as File)}
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
									onChange={onFileChange(setImage)}
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
						<Button onClick={onCrop(cropperRef, setImageCropped)}>Acept</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

import { basename, join } from "node:path";
import { Elysia, t } from "elysia";

export const upload = new Elysia().group("/files", (app) =>
	app.post(
		"/upload",
		async ({ body }) => {
			const { file, name } = body;
			const path = `${join(import.meta.dir, "..", "public", Bun.randomUUIDv7())}_${basename(file.name)}`;
			Bun.write(path, file);
			return { success: true, path };
		},
		{
			body: t.Object({
				name: t.String(),
				file: t.File(),
			}),
		},
	),
);

// const file = Bun.file(join(import.meta.dir, "image.png"));
// const form = new FormData();
// form.append("file", file);
// form.append("name", "custom name for file");
// const request = new Request("http://localhost:4343/files/upload", {
// 	method: "POST",
// 	body: form,
// });

// console.log(await (await upload.handle(request)).json());

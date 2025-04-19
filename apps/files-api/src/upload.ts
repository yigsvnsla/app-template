import { basename, join } from "node:path";
import { Elysia, t } from "elysia";

export const upload = new Elysia().group("/files", (app) =>
	app.post(
		"/upload",
		async ({ body, request }) => {
			const { file } = body;
			console.log(request.headers);
			const url = new URL(request.url);
			const uuid = crypto.randomUUID();
			const pathToFile = `${join(import.meta.dir, "..", "public", uuid)}_${basename(file.name)}`;
			Bun.write(pathToFile, file);
			const pathToResource = `${url.origin}/public/${uuid}_${basename(file.name)}`;
			return {
				success: true,
				path: pathToResource,
				id: `${uuid}_${basename(file.name)}`,
			};
		},
		{
			body: t.Object({
				file: t.File({
				}),
			}),
			response: t.Object({
				success: t.Boolean(),
				path: t.String(),
				id: t.String(),
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

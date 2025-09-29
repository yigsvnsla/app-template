import { cors as ElysiaCors } from "@elysiajs/cors";

export const cors = ElysiaCors({
  origin: [process.env.APP_ADMIN_ORIGIN, process.env.APP_FILES_ORIGIN,],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
})
import cors from '@elysiajs/cors';
import { staticPlugin } from '@elysiajs/static';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import logixlysia from 'logixlysia';
import { upload } from './upload';
import '../types/.d.ts';
import { logger } from '@bogeychan/elysia-logger';
import { todoController } from './modules/todo/todo.controller';

const app = new Elysia()
  .use(
    cors({
      origin: [process.env.APP_ADMIN_ORIGIN, process.env.APP_FILES_ORIGIN, '*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  // .use(logixlysia)
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
  )
  .use(staticPlugin())
  .use(upload)
  .use(todoController)
  .use(swagger())
  .listen(4343);

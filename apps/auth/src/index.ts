import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import logixlysia from 'logixlysia';
import { betterAuth } from '../middleware/auth.middleware';

const app = new Elysia()
  .use(betterAuth)
  .use(logixlysia())
  .use(swagger())
  .use(
    cors({
      origin: [process.env.APP_ADMIN_ORIGIN, process.env.APP_FILES_ORIGIN,"*"],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .get('/user', ({ user }) => user, {
    auth: true,
  })
  .listen(Number.parseInt(process.env.AUTH_SERVER_PORT));

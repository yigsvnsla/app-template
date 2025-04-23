declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SERVER_HOSTNAME: string;
      AUTH_SERVER_PORT: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
      BETTER_AUTH_TRUSTED_ORIGINS: string;
      APP_ADMIN_ORIGIN: string;
    }
  }
}

export {}

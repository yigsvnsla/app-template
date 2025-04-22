declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SERVER_HOSTNAME: string;
      AUTH_SERVER_PORT: string;
      AUTH_SERVER_TRUSTED_ORIGINS: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
      CLIENT_ADMIN_PANEL: string;
    }
  }
}

export {}

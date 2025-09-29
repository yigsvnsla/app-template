import { Type as t } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const envSchema = t.Object({
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production")], {
    default: "development",
  }),
  AUTH_SECRET: t.String(),
  DATABASE_URL: t.String(),
  APP_ADMIN_ORIGIN: t.String(),
  APP_FILES_ORIGIN: t.String(),
  APP_ADMIN_WEB: t.String(),
});

export type EnvSchema = typeof envSchema.static;

const processEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || "development",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  APP_ADMIN_ORIGIN: process.env.APP_ADMIN_ORIGIN || "",
  APP_FILES_ORIGIN: process.env.APP_FILES_ORIGIN || "",
  APP_ADMIN_WEB: process.env.APP_ADMIN_WEB || "",
};

const validateEnv = () => {
  if (!Value.Check(envSchema, processEnv)) {
    const errors = Value.Errors(envSchema, processEnv);
    for (const error of errors) {
      console.error(`❌ Variable inválida: ${error.path}, Detalles: ${error.message}`);
    }
    throw new Error("Configuración de entorno inválida.");
  }
};

validateEnv();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "production";
      AUTH_SECRET: string;
      DATABASE_URL: string;
      APP_ADMIN_ORIGIN: string;
      APP_FILES_ORIGIN: string;
      APP_ADMIN_WEB: string;
    }
  }
}

export const env = Value.Cast(envSchema, processEnv);

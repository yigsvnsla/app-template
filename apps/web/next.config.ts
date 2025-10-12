import type { NextConfig } from "next";

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
  /* config options here */
};

export default nextConfig;

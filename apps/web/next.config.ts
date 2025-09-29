import type { NextConfig } from "next";

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;

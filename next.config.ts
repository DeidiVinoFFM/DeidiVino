import type { NextConfig } from "next";
import { existsSync } from "node:fs";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const hasCustomDomain =
  existsSync("public/CNAME") || existsSync("CNAME");
const githubBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !hasCustomDomain
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: githubBasePath,
  },
};

export default nextConfig;

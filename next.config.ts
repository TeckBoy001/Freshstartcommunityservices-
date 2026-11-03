import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle the JSON data file with server functions so runtime reads work on Netlify.
  outputFileTracingIncludes: {
    "/**": ["./data/**/*"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.101.*", "localhost", "127.0.0.1"],
};

export default nextConfig;

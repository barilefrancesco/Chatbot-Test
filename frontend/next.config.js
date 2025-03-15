/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    output: "standalone",
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: process.env.NODE_ENV === "production"
                ? "http://backend:5000/:path*"
                : "http://localhost:5000/:path*",
        },
        ];
    },
};

export default config;

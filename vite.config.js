import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const DEFAULT_BACKEND_TARGET = "http://127.0.0.1:8080";

const trimTrailingSlash = (value) => String(value || "").trim().replace(/\/+$/, "");
const resolveProxyTarget = (value) =>
  !value || value.startsWith("/") ? DEFAULT_BACKEND_TARGET : value;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendTarget = resolveProxyTarget(trimTrailingSlash(env.VITE_BACKEND_URL));

  return {
    plugins: [react(), tailwindcss()],
    assetsInclude: ["**/*.JPG"],
    server: {
      proxy: {
        "/api": {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "build",
    },
  };
});

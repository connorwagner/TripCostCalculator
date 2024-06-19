/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // the remix plugin has to be disabled during unit tests
    !process.env.VITEST &&
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
        ignoredRouteFiles: ["**/*.test.ts", "**/*.test.tsx"],
      }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});

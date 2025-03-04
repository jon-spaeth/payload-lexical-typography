import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts", "src/converters.ts"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true,
  tsconfig: "tsconfig.json",
  outDir: "dist",
  external: ["react", "react-dom", "@payloadcms/richtext-lexical"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  esbuildOptions(options) {
    options.external = ["react", "react-dom", "@payloadcms/richtext-lexical"];
  },
});

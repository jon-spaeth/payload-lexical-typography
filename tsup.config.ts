import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true,
  tsconfig: "tsconfig.json",
  outDir: "dist",
  external: ["react", "react-dom", "@payloadcms/richtext-lexical"],
  esbuildOptions(options) {
    options.external = ["react", "react-dom", "@payloadcms/richtext-lexical"];
  },
});

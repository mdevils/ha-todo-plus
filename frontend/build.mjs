// Bundles the Todo Plus Lovelace card from TypeScript sources into the
// integration folder so it ships with the HACS-installed component.
//
//   npm run build     -> minified production bundle
//   npm run watch     -> rebuild on change
//   npm run dev       -> unminified + sourcemap, rebuild on change
import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const dev = process.argv.includes("--dev");
const watch = process.argv.includes("--watch");

/** Output lives INSIDE the integration so HACS delivers it with the component. */
const outfile = path.join(
  dir,
  "..",
  "custom_components",
  "todo_plus",
  "www",
  "todo-plus-card.js"
);

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: [path.join(dir, "src", "index.ts")],
  bundle: true,
  format: "esm",
  target: ["es2020"],
  outfile,
  minify: !dev,
  sourcemap: dev,
  loader: { ".json": "json" },
  logLevel: "info",
  banner: {
    js: "/* todo-plus-card — generated bundle. Edit sources in frontend/src, then `npm run build`. */",
  },
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log(`watching… -> ${path.relative(process.cwd(), outfile)}`);
} else {
  await esbuild.build(options);
  console.log(`built -> ${path.relative(process.cwd(), outfile)}`);
}

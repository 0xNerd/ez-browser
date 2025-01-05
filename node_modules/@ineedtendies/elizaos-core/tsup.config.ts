import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"],
    platform: "browser",
    target: "es2020",
    bundle: true,
    splitting: false,
    dts: true,
    noExternal: ["*"],
    external: [
        "fs",
        "fs/promises",
        "path",
        "os",
        "crypto",
        "stream",
        "buffer",
        "node:path",
        "node:fs",
        "node:http",
        "node:https",
        "node:crypto",
        "node:os",
        "dotenv",
    ],
    define: {
        global: "undefined",
        "process.env.USE_OPENAI_EMBEDDING": "true",
        "process.env.USE_OLLAMA_EMBEDDING": "false",
    },
    esbuildOptions(options) {
        options.globalName = "ineedtendiesElizaosCore";
        options.mainFields = ["browser", "module", "main"];
        options.conditions = ["browser", "import"];
    },
});

#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_commander = require("commander");
var import_prompts = __toESM(require("prompts"));
var import_picocolors = __toESM(require("picocolors"));
var import_child_process = require("child_process");
var import_fs = require("fs");
var import_path = require("path");
var program = new import_commander.Command();
program.name("presotion").description("CLI for creating and managing Presotion presentations").version("0.1.0");
program.command("create").description("Create a new Presotion presentation project").argument("[name]", "Project name").option("-t, --template <template>", "Template to use", "default").action(async (name, options) => {
  console.log(import_picocolors.default.bold(import_picocolors.default.cyan("\n  Presotion - Programmatic Presentations\n")));
  let projectName = name;
  if (!projectName) {
    const response = await (0, import_prompts.default)({
      type: "text",
      name: "name",
      message: "Project name:",
      initial: "my-presentation"
    });
    projectName = response.name;
  }
  if (!projectName) {
    console.log(import_picocolors.default.red("Project name is required"));
    process.exit(1);
  }
  const projectPath = (0, import_path.join)(process.cwd(), projectName);
  if ((0, import_fs.existsSync)(projectPath)) {
    console.log(import_picocolors.default.red(`Directory ${projectName} already exists`));
    process.exit(1);
  }
  console.log(import_picocolors.default.dim(`
Creating project in ${projectPath}...
`));
  (0, import_fs.mkdirSync)(projectPath, { recursive: true });
  (0, import_fs.mkdirSync)((0, import_path.join)(projectPath, "src"));
  (0, import_fs.mkdirSync)((0, import_path.join)(projectPath, "public"));
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview"
    },
    dependencies: {
      "@presotion/core": "https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/core?main",
      "@presotion/player": "https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/player?main",
      "@presotion/layouts": "https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/layouts?main",
      "@presotion/code": "https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/code?main",
      "@presotion/transitions": "https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/transitions?main",
      react: "^18.2.0",
      "react-dom": "^18.2.0"
    },
    devDependencies: {
      "@types/react": "^18.2.48",
      "@types/react-dom": "^18.2.18",
      "@vitejs/plugin-react": "^4.2.1",
      typescript: "^5.3.3",
      vite: "^5.0.12"
    }
  };
  (0, import_fs.writeFileSync)(
    (0, import_path.join)(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
  const tsConfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ["src"]
  };
  (0, import_fs.writeFileSync)(
    (0, import_path.join)(projectPath, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
  (0, import_fs.writeFileSync)((0, import_path.join)(projectPath, "vite.config.ts"), viteConfig);
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body, #root { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  (0, import_fs.writeFileSync)((0, import_path.join)(projectPath, "index.html"), indexHtml);
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { Player } from '@presotion/player';
import { Presentation } from './Presentation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Player
      component={Presentation}
      compositionWidth={1920}
      compositionHeight={1080}
      slideCount={3}
      fragmentCounts={[1, 3, 1]}
      controls
      allowKeyboard
    />
  </React.StrictMode>
);
`;
  (0, import_fs.writeFileSync)((0, import_path.join)(projectPath, "src/main.tsx"), mainTsx);
  const presentationTsx = `import { Deck, FragmentList } from '@presotion/core';
import { CoverLayout, DefaultLayout, CenterLayout } from '@presotion/layouts';

export const Presentation = () => {
  return (
    <Deck>
      <Deck.Slide fragmentCount={1}>
        <CoverLayout
          title="My Presentation"
          subtitle="Created with Presotion"
          footer="Press Space or Arrow Keys to navigate"
        />
      </Deck.Slide>

      <Deck.Slide fragmentCount={3}>
        <DefaultLayout style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
          <h2 style={{ fontSize: 48, marginBottom: 40 }}>Key Features</h2>
          <FragmentList>
            <p style={{ fontSize: 32, marginBottom: 20 }}>React-based slide creation</p>
            <p style={{ fontSize: 32, marginBottom: 20 }}>Fragment animations</p>
            <p style={{ fontSize: 32, marginBottom: 20 }}>AI agent integration</p>
          </FragmentList>
        </DefaultLayout>
      </Deck.Slide>

      <Deck.Slide fragmentCount={1}>
        <CenterLayout style={{ backgroundColor: '#3b82f6', color: '#fff' }}>
          <h1 style={{ fontSize: 64 }}>Thank You!</h1>
        </CenterLayout>
      </Deck.Slide>
    </Deck>
  );
};
`;
  (0, import_fs.writeFileSync)((0, import_path.join)(projectPath, "src/Presentation.tsx"), presentationTsx);
  const gitignore = `node_modules
dist
.DS_Store
*.local
`;
  (0, import_fs.writeFileSync)((0, import_path.join)(projectPath, ".gitignore"), gitignore);
  console.log(import_picocolors.default.green("  Project created successfully!\n"));
  console.log(import_picocolors.default.dim("  Next steps:\n"));
  console.log(`    ${import_picocolors.default.cyan("cd")} ${projectName}`);
  console.log(`    ${import_picocolors.default.cyan("npm install")}`);
  console.log(`    ${import_picocolors.default.cyan("npm run dev")}
`);
});
program.command("dev").description("Start the development server").action(() => {
  console.log(import_picocolors.default.cyan("Starting development server..."));
  (0, import_child_process.execSync)("npx vite", { stdio: "inherit" });
});
program.command("build").description("Build the presentation for production").action(() => {
  console.log(import_picocolors.default.cyan("Building presentation..."));
  (0, import_child_process.execSync)("npx vite build", { stdio: "inherit" });
});
program.command("export").description("Export presentation to PDF or PPTX").option("-f, --format <format>", "Export format (pdf, pptx)", "pdf").option("-o, --output <path>", "Output file path").action((options) => {
  console.log(import_picocolors.default.cyan(`Exporting to ${options.format}...`));
  console.log(import_picocolors.default.yellow("Export functionality coming soon!"));
});
program.parse();

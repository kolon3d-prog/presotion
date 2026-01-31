#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const program = new Command();

program
  .name('presotion')
  .description('CLI for creating and managing Presotion presentations')
  .version('0.1.0');

program
  .command('create')
  .description('Create a new Presotion presentation project')
  .argument('[name]', 'Project name')
  .option('-t, --template <template>', 'Template to use', 'default')
  .action(async (name, options) => {
    console.log(pc.bold(pc.cyan('\n  Presotion - Programmatic Presentations\n')));

    let projectName = name;

    if (!projectName) {
      const response = await prompts({
        type: 'text',
        name: 'name',
        message: 'Project name:',
        initial: 'my-presentation',
      });
      projectName = response.name;
    }

    if (!projectName) {
      console.log(pc.red('Project name is required'));
      process.exit(1);
    }

    const projectPath = join(process.cwd(), projectName);

    if (existsSync(projectPath)) {
      console.log(pc.red(`Directory ${projectName} already exists`));
      process.exit(1);
    }

    console.log(pc.dim(`\nCreating project in ${projectPath}...\n`));

    // Create project structure
    mkdirSync(projectPath, { recursive: true });
    mkdirSync(join(projectPath, 'src'));
    mkdirSync(join(projectPath, 'public'));

    // Create package.json
    // Using gitpkg.vercel.app to install from monorepo subdirectories
    const packageJson = {
      name: projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@presotion/core': 'https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/core?main',
        '@presotion/player': 'https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/player?main',
        '@presotion/layouts': 'https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/layouts?main',
        '@presotion/code': 'https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/code?main',
        '@presotion/transitions': 'https://gitpkg.vercel.app/kolon3d-prog/presotion/packages/transitions?main',
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/react': '^18.2.48',
        '@types/react-dom': '^18.2.18',
        '@vitejs/plugin-react': '^4.2.1',
        typescript: '^5.3.3',
        vite: '^5.0.12',
      },
    };

    writeFileSync(
      join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create tsconfig.json
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
    };

    writeFileSync(
      join(projectPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );

    // Create vite.config.ts
    const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

    writeFileSync(join(projectPath, 'vite.config.ts'), viteConfig);

    // Create index.html
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

    writeFileSync(join(projectPath, 'index.html'), indexHtml);

    // Create main.tsx
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

    writeFileSync(join(projectPath, 'src/main.tsx'), mainTsx);

    // Create Presentation.tsx
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

    writeFileSync(join(projectPath, 'src/Presentation.tsx'), presentationTsx);

    // Create .gitignore
    const gitignore = `node_modules
dist
.DS_Store
*.local
`;

    writeFileSync(join(projectPath, '.gitignore'), gitignore);

    console.log(pc.green('  Project created successfully!\n'));
    console.log(pc.dim('  Next steps:\n'));
    console.log(`    ${pc.cyan('cd')} ${projectName}`);
    console.log(`    ${pc.cyan('npm install')}`);
    console.log(`    ${pc.cyan('npm run dev')}\n`);
  });

program
  .command('dev')
  .description('Start the development server')
  .action(() => {
    console.log(pc.cyan('Starting development server...'));
    execSync('npx vite', { stdio: 'inherit' });
  });

program
  .command('build')
  .description('Build the presentation for production')
  .action(() => {
    console.log(pc.cyan('Building presentation...'));
    execSync('npx vite build', { stdio: 'inherit' });
  });

program
  .command('export')
  .description('Export presentation to PDF or PPTX')
  .option('-f, --format <format>', 'Export format (pdf, pptx)', 'pdf')
  .option('-o, --output <path>', 'Output file path')
  .action((options) => {
    console.log(pc.cyan(`Exporting to ${options.format}...`));
    console.log(pc.yellow('Export functionality coming soon!'));
  });

program.parse();

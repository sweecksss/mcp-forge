import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function runInitCommand(projectName?: string) {
  const targetName = projectName || 'my-mcp-server';
  const targetDir = path.resolve(process.cwd(), targetName);

  if (fs.existsSync(targetDir)) {
    console.error(chalk.red(`Error: Directory '${targetName}' already exists!`));
    process.exit(1);
  }

  const spinner = ora(`Scaffolding MCP Server in ${chalk.bold(targetName)}...`).start();

  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(path.join(targetDir, 'src'), { recursive: true });

    // package.json template
    const pkgJson = {
      name: targetName,
      version: '1.0.0',
      description: 'Custom MCP Server generated with mcp-forge',
      type: 'module',
      main: './dist/index.js',
      bin: {
        [targetName]: './dist/index.js'
      },
      scripts: {
        build: 'tsup',
        dev: 'tsup --watch',
        start: 'node ./dist/index.js'
      },
      dependencies: {
        '@modelcontextprotocol/sdk': '^1.1.0',
        'zod': '^3.23.8'
      },
      devDependencies: {
        '@types/node': '^20.14.9',
        'tsup': '^8.1.0',
        'typescript': '^5.5.2'
      }
    };

    fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

    // tsconfig.json template
    const tsConfig = {
      compilerOptions: {
        target: 'ES2022',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        strict: true,
        outDir: './dist',
        rootDir: './src',
        skipLibCheck: true
      },
      include: ['src/**/*']
    };
    fs.writeFileSync(path.join(targetDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

    // tsup.config.ts
    const tsupConfig = `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node'
  }
});
`;
    fs.writeFileSync(path.join(targetDir, 'tsup.config.ts'), tsupConfig);

    // src/index.ts template
    const serverCode = `import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

const server = new Server(
  {
    name: '${targetName}',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Define tool schemas
const echoSchema = z.object({
  message: z.string().describe('Message to echo back')
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'echo',
        description: 'Simple echo tool',
        inputSchema: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Message to echo' }
          },
          required: ['message']
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'echo') {
    const { message } = echoSchema.parse(request.params.arguments);
    return {
      content: [
        {
          type: 'text',
          text: \`Echo: \${message}\`
        }
      ]
    };
  }
  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('${targetName} MCP Server running on stdio');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'index.ts'), serverCode);

    // README.md template
    const readmeContent = `# ${targetName}

Model Context Protocol (MCP) Server generated with [mcp-forge](https://github.com/sweecksss/mcp-forge).

## Getting Started

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

## Test with mcp-forge Inspector

\`\`\`bash
npx mcp-forge inspect node ./dist/index.js
\`\`\`
`;
    fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);

    spinner.succeed(chalk.green(`Successfully scaffolded ${chalk.bold(targetName)}!`));

    console.log(`\nNext steps:`);
    console.log(`  ${chalk.cyan(`cd ${targetName}`)}`);
    console.log(`  ${chalk.cyan(`npm install`)}`);
    console.log(`  ${chalk.cyan(`npm run dev`)}\n`);
  } catch (error: any) {
    spinner.fail(chalk.red(`Failed to scaffold project: ${error.message}`));
  }
}

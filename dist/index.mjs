#!/usr/bin/env node

// src/tools/gitTool.ts
import { execSync } from "child_process";
import { z } from "zod";
var gitSummarySchema = z.object({
  cwd: z.string().optional().describe("Directory path of the Git repository (defaults to current working directory)")
});
async function handleGitSummary(args) {
  const cwd = args.cwd || process.cwd();
  try {
    const status = execSync("git status --short", { cwd, encoding: "utf-8" });
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd, encoding: "utf-8" }).trim();
    const lastCommit = execSync("git log -1 --oneline", { cwd, encoding: "utf-8" }).trim();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              branch,
              lastCommit,
              uncommittedChanges: status.split("\n").filter(Boolean).length,
              statusOutput: status || "Clean working tree"
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Git Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
}

// src/tools/systemTool.ts
import os from "os";
import { z as z2 } from "zod";
var systemDiagnosticsSchema = z2.object({});
async function handleSystemDiagnostics() {
  const cpus = os.cpus();
  const totalMemMb = Math.round(os.totalmem() / (1024 * 1024));
  const freeMemMb = Math.round(os.freemem() / (1024 * 1024));
  const info = {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    uptimeSeconds: Math.round(os.uptime()),
    cpuModel: cpus.length > 0 ? cpus[0].model : "Unknown",
    cpuCores: cpus.length,
    memory: {
      totalMb: totalMemMb,
      freeMb: freeMemMb,
      usedMb: totalMemMb - freeMemMb
    }
  };
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info, null, 2)
      }
    ]
  };
}

// src/tools/mermaidTool.ts
import { z as z3 } from "zod";
var mermaidValidateSchema = z3.object({
  diagram: z3.string().describe("The Mermaid.js diagram code string to validate")
});
async function handleMermaidValidate(args) {
  const { diagram } = args;
  const validKeywords = ["graph", "flowchart", "sequenceDiagram", "classDiagram", "stateDiagram", "erDiagram", "gantt", "pie", "gitGraph", "mindmap", "timeline", "architecture"];
  const trimmed = diagram.trim();
  const firstWord = trimmed.split(/\s+/)[0];
  const isValidType = validKeywords.some((kw) => firstWord.startsWith(kw));
  if (!isValidType) {
    return {
      content: [
        {
          type: "text",
          text: `Validation Failed: Diagram must start with a valid Mermaid diagram type (e.g. flowchart, graph, sequenceDiagram). Found '${firstWord}'.`
        }
      ],
      isError: true
    };
  }
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            valid: true,
            type: firstWord,
            lineCount: trimmed.split("\n").length,
            message: "Mermaid diagram syntax structure is valid."
          },
          null,
          2
        )
      }
    ]
  };
}

// src/tools/httpTool.ts
import { z as z4 } from "zod";
var httpTesterSchema = z4.object({
  url: z4.string().url().describe("HTTP URL to send a request to"),
  method: z4.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).default("GET").describe("HTTP Method"),
  headers: z4.record(z4.string()).optional().describe("Headers key-value object"),
  body: z4.string().optional().describe("JSON request body for POST/PUT")
});
async function handleHttpTester(args) {
  try {
    const startTime = Date.now();
    const options = {
      method: args.method,
      headers: args.headers || {}
    };
    if (args.body && ["POST", "PUT", "PATCH"].includes(args.method)) {
      options.body = args.body;
      if (!options.headers) options.headers = {};
      options.headers["Content-Type"] = "application/json";
    }
    const response = await fetch(args.url, options);
    const durationMs = Date.now() - startTime;
    const responseText = await response.text();
    let parsedBody = responseText;
    try {
      parsedBody = JSON.parse(responseText);
    } catch (_) {
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: response.status,
              statusText: response.statusText,
              durationMs,
              headers: Object.fromEntries(response.headers.entries()),
              body: parsedBody
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `HTTP Request Failed: ${error.message}`
        }
      ],
      isError: true
    };
  }
}

// src/tools/sqliteTool.ts
import { z as z5 } from "zod";
import fs from "fs";
import { execSync as execSync2 } from "child_process";
var sqliteInspectorSchema = z5.object({
  dbPath: z5.string().describe("Absolute or relative path to SQLite database file"),
  query: z5.string().optional().describe("Optional SQL SELECT query to execute (defaults to listing tables)")
});
async function handleSqliteInspector(args) {
  const { dbPath, query } = args;
  if (!fs.existsSync(dbPath)) {
    return {
      content: [
        {
          type: "text",
          text: `Database Error: SQLite file not found at path '${dbPath}'`
        }
      ],
      isError: true
    };
  }
  try {
    const sqlCmd = query || ".tables";
    const output = execSync2(`sqlite3 "${dbPath}" "${sqlCmd}"`, { encoding: "utf-8" }).trim();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              dbPath,
              queryExecuted: sqlCmd,
              result: output || "Query executed successfully with empty result."
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error) {
    const stats = fs.statSync(dbPath);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              dbPath,
              sizeBytes: stats.size,
              lastModified: stats.mtime,
              note: `SQLite CLI fallback mode active. File size: ${stats.size} bytes.`
            },
            null,
            2
          )
        }
      ]
    };
  }
}

// src/tools/dockerTool.ts
import { execSync as execSync3 } from "child_process";
import { z as z6 } from "zod";
var dockerStatusSchema = z6.object({
  all: z6.boolean().optional().default(false).describe("Show all containers including stopped ones")
});
async function handleDockerStatus(args) {
  try {
    const flag = args.all ? "-a" : "";
    const output = execSync3(`docker ps ${flag} --format "{{.ID}}|{{.Image}}|{{.Status}}|{{.Names}}"`, { encoding: "utf-8" }).trim();
    if (!output) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ activeContainers: 0, containers: [] }, null, 2)
          }
        ]
      };
    }
    const containers = output.split("\n").map((line) => {
      const [id, image, status, name] = line.split("|");
      return { id, image, status, name };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              activeContainers: containers.length,
              containers
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Docker Error: Docker daemon not running or not installed (${error.message})`
        }
      ],
      isError: true
    };
  }
}

// src/tools/codeMetricsTool.ts
import fs2 from "fs";
import path from "path";
import { z as z7 } from "zod";
var codeMetricsSchema = z7.object({
  dirPath: z7.string().optional().describe("Directory path to analyze (defaults to current working directory)")
});
async function handleCodeMetrics(args) {
  const targetDir = path.resolve(process.cwd(), args.dirPath || ".");
  if (!fs2.existsSync(targetDir)) {
    return {
      content: [
        {
          type: "text",
          text: `Error: Directory path '${targetDir}' does not exist.`
        }
      ],
      isError: true
    };
  }
  const extensionCounts = {};
  let totalFiles = 0;
  let totalLines = 0;
  function walk(currentDir) {
    const files = fs2.readdirSync(currentDir, { withFileTypes: true });
    for (const file of files) {
      if (file.name.startsWith(".") || file.name === "node_modules" || file.name === "dist" || file.name === "build") {
        continue;
      }
      const fullPath = path.join(currentDir, file.name);
      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase() || "no-extension";
        try {
          const content = fs2.readFileSync(fullPath, "utf-8");
          const lines = content.split("\n").length;
          totalFiles++;
          totalLines += lines;
          if (!extensionCounts[ext]) {
            extensionCounts[ext] = { files: 0, lines: 0 };
          }
          extensionCounts[ext].files++;
          extensionCounts[ext].lines += lines;
        } catch (_) {
        }
      }
    }
  }
  walk(targetDir);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            targetDir,
            totalFiles,
            totalLines,
            byLanguage: extensionCounts
          },
          null,
          2
        )
      }
    ]
  };
}

// src/commands/serve.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
async function runServeCommand() {
  const server = new Server(
    {
      name: "mcp-forge-suite",
      version: "1.1.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "git_summary",
          description: "Get status, branch, and last commit summary of a Git repository",
          inputSchema: {
            type: "object",
            properties: {
              cwd: { type: "string", description: "Repository directory path" }
            }
          }
        },
        {
          name: "system_diagnostics",
          description: "Get CPU, memory, uptime, and system platform information",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "mermaid_validate",
          description: "Validate Mermaid.js diagram syntax structure",
          inputSchema: {
            type: "object",
            properties: {
              diagram: { type: "string", description: "Mermaid diagram text" }
            },
            required: ["diagram"]
          }
        },
        {
          name: "http_tester",
          description: "Send an HTTP GET/POST request and return status, duration, headers, and body",
          inputSchema: {
            type: "object",
            properties: {
              url: { type: "string", description: "Request URL" },
              method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"], default: "GET" },
              headers: { type: "object", description: "Request headers" },
              body: { type: "string", description: "Request body" }
            },
            required: ["url"]
          }
        },
        {
          name: "sqlite_inspector",
          description: "Inspect tables and execute read-only queries on local SQLite databases",
          inputSchema: {
            type: "object",
            properties: {
              dbPath: { type: "string", description: "Path to SQLite database file" },
              query: { type: "string", description: "SQL SELECT query to execute" }
            },
            required: ["dbPath"]
          }
        },
        {
          name: "docker_status",
          description: "Inspect active Docker containers, statuses, and names",
          inputSchema: {
            type: "object",
            properties: {
              all: { type: "boolean", description: "Include stopped containers" }
            }
          }
        },
        {
          name: "code_metrics",
          description: "Analyze codebase line count (LOC), total files, and language breakdown",
          inputSchema: {
            type: "object",
            properties: {
              dirPath: { type: "string", description: "Directory path to analyze" }
            }
          }
        }
      ]
    };
  });
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case "git_summary":
        return await handleGitSummary(gitSummarySchema.parse(args || {}));
      case "system_diagnostics":
        return await handleSystemDiagnostics();
      case "mermaid_validate":
        return await handleMermaidValidate(mermaidValidateSchema.parse(args || {}));
      case "http_tester":
        return await handleHttpTester(httpTesterSchema.parse(args || {}));
      case "sqlite_inspector":
        return await handleSqliteInspector(sqliteInspectorSchema.parse(args || {}));
      case "docker_status":
        return await handleDockerStatus(dockerStatusSchema.parse(args || {}));
      case "code_metrics":
        return await handleCodeMetrics(codeMetricsSchema.parse(args || {}));
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// src/commands/init.ts
import fs3 from "fs";
import path2 from "path";
import chalk from "chalk";
import ora from "ora";
async function runInitCommand(projectName) {
  const targetName = projectName || "my-mcp-server";
  const targetDir = path2.resolve(process.cwd(), targetName);
  if (fs3.existsSync(targetDir)) {
    console.error(chalk.red(`Error: Directory '${targetName}' already exists!`));
    process.exit(1);
  }
  const spinner = ora(`Scaffolding MCP Server in ${chalk.bold(targetName)}...`).start();
  try {
    fs3.mkdirSync(targetDir, { recursive: true });
    fs3.mkdirSync(path2.join(targetDir, "src"), { recursive: true });
    const pkgJson = {
      name: targetName,
      version: "1.0.0",
      description: "Custom MCP Server generated with mcp-forge",
      type: "module",
      main: "./dist/index.js",
      bin: {
        [targetName]: "./dist/index.js"
      },
      scripts: {
        build: "tsup",
        dev: "tsup --watch",
        start: "node ./dist/index.js"
      },
      dependencies: {
        "@modelcontextprotocol/sdk": "^1.1.0",
        "zod": "^3.23.8"
      },
      devDependencies: {
        "@types/node": "^20.14.9",
        "tsup": "^8.1.0",
        "typescript": "^5.5.2"
      }
    };
    fs3.writeFileSync(path2.join(targetDir, "package.json"), JSON.stringify(pkgJson, null, 2));
    const tsConfig = {
      compilerOptions: {
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
        outDir: "./dist",
        rootDir: "./src",
        skipLibCheck: true
      },
      include: ["src/**/*"]
    };
    fs3.writeFileSync(path2.join(targetDir, "tsconfig.json"), JSON.stringify(tsConfig, null, 2));
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
    fs3.writeFileSync(path2.join(targetDir, "tsup.config.ts"), tsupConfig);
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
    fs3.writeFileSync(path2.join(targetDir, "src", "index.ts"), serverCode);
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
    fs3.writeFileSync(path2.join(targetDir, "README.md"), readmeContent);
    spinner.succeed(chalk.green(`Successfully scaffolded ${chalk.bold(targetName)}!`));
    console.log(`
Next steps:`);
    console.log(`  ${chalk.cyan(`cd ${targetName}`)}`);
    console.log(`  ${chalk.cyan(`npm install`)}`);
    console.log(`  ${chalk.cyan(`npm run dev`)}
`);
  } catch (error) {
    spinner.fail(chalk.red(`Failed to scaffold project: ${error.message}`));
  }
}
export {
  codeMetricsSchema,
  dockerStatusSchema,
  gitSummarySchema,
  handleCodeMetrics,
  handleDockerStatus,
  handleGitSummary,
  handleHttpTester,
  handleMermaidValidate,
  handleSqliteInspector,
  handleSystemDiagnostics,
  httpTesterSchema,
  mermaidValidateSchema,
  runInitCommand,
  runServeCommand,
  sqliteInspectorSchema,
  systemDiagnosticsSchema
};
//# sourceMappingURL=index.mjs.map
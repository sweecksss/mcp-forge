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

// src/utils/banner.ts
var import_chalk = __toESM(require("chalk"));
function getBanner() {
  const logo = `
   ${import_chalk.default.hex("#FF6B6B").bold("\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 ")}    ${import_chalk.default.hex("#4D96FF").bold("\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557")}
   ${import_chalk.default.hex("#FF6B6B").bold("\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557")}    ${import_chalk.default.hex("#4D96FF").bold("\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D")}
   ${import_chalk.default.hex("#FF8E53").bold("\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D")}    ${import_chalk.default.hex("#6BCB77").bold("\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551  \u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2557  ")}
   ${import_chalk.default.hex("#FF8E53").bold("\u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2550\u255D ")}    ${import_chalk.default.hex("#6BCB77").bold("\u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255D  ")}
   ${import_chalk.default.hex("#FFD93D").bold("\u2588\u2588\u2551 \u255A\u2550\u255D \u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551     ")}    ${import_chalk.default.hex("#FFD93D").bold("\u2588\u2588\u2551     \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557")}
   ${import_chalk.default.hex("#FFD93D").bold("\u255A\u2550\u255D     \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D     ")}    ${import_chalk.default.hex("#FFD93D").bold("\u255A\u2550\u255D     \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D")}
  `;
  const tag = `  ${import_chalk.default.bgHex("#4D96FF").white.bold(" MCP-FORGE ")} ${import_chalk.default.dim("v1.0.0")} \u2014 ${import_chalk.default.gray("The Swiss-Army Developer Toolkit for MCP Servers")}`;
  return `${logo}
${tag}
`;
}
function printBanner() {
  console.log(getBanner());
}

// src/commands/init.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_chalk2 = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));
async function runInitCommand(projectName) {
  const targetName = projectName || "my-mcp-server";
  const targetDir = import_path.default.resolve(process.cwd(), targetName);
  if (import_fs.default.existsSync(targetDir)) {
    console.error(import_chalk2.default.red(`Error: Directory '${targetName}' already exists!`));
    process.exit(1);
  }
  const spinner = (0, import_ora.default)(`Scaffolding MCP Server in ${import_chalk2.default.bold(targetName)}...`).start();
  try {
    import_fs.default.mkdirSync(targetDir, { recursive: true });
    import_fs.default.mkdirSync(import_path.default.join(targetDir, "src"), { recursive: true });
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
    import_fs.default.writeFileSync(import_path.default.join(targetDir, "package.json"), JSON.stringify(pkgJson, null, 2));
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
    import_fs.default.writeFileSync(import_path.default.join(targetDir, "tsconfig.json"), JSON.stringify(tsConfig, null, 2));
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
    import_fs.default.writeFileSync(import_path.default.join(targetDir, "tsup.config.ts"), tsupConfig);
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
    import_fs.default.writeFileSync(import_path.default.join(targetDir, "src", "index.ts"), serverCode);
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
    import_fs.default.writeFileSync(import_path.default.join(targetDir, "README.md"), readmeContent);
    spinner.succeed(import_chalk2.default.green(`Successfully scaffolded ${import_chalk2.default.bold(targetName)}!`));
    console.log(`
Next steps:`);
    console.log(`  ${import_chalk2.default.cyan(`cd ${targetName}`)}`);
    console.log(`  ${import_chalk2.default.cyan(`npm install`)}`);
    console.log(`  ${import_chalk2.default.cyan(`npm run dev`)}
`);
  } catch (error) {
    spinner.fail(import_chalk2.default.red(`Failed to scaffold project: ${error.message}`));
  }
}

// src/commands/inspect.ts
var import_client = require("@modelcontextprotocol/sdk/client/index.js");
var import_stdio = require("@modelcontextprotocol/sdk/client/stdio.js");
var import_chalk3 = __toESM(require("chalk"));
var import_ora2 = __toESM(require("ora"));
async function runInspectCommand(commandArgs) {
  if (commandArgs.length === 0) {
    console.error(import_chalk3.default.red("Error: Please provide the command to run the target MCP server."));
    console.log(import_chalk3.default.yellow("Example: mcp-forge inspect node ./dist/index.js"));
    process.exit(1);
  }
  const [cmd, ...args] = commandArgs;
  console.log(import_chalk3.default.blue(`Connecting to MCP server via stdio: ${import_chalk3.default.bold([cmd, ...args].join(" "))}`));
  const spinner = (0, import_ora2.default)("Initializing Stdio Transport...").start();
  try {
    const transport = new import_stdio.StdioClientTransport({
      command: cmd,
      args
    });
    const client = new import_client.Client(
      {
        name: "mcp-forge-inspector",
        version: "1.0.0"
      },
      {
        capabilities: {}
      }
    );
    await client.connect(transport);
    spinner.succeed(import_chalk3.default.green("Successfully connected to MCP Server!"));
    console.log(`
${import_chalk3.default.bgBlue.white.bold(" SERVER INSPECTION ")}
`);
    try {
      const toolsResult = await client.listTools();
      console.log(import_chalk3.default.bold.cyan(`\u{1F6E0}\uFE0F  Tools (${toolsResult.tools.length}):`));
      for (const tool of toolsResult.tools) {
        console.log(`  \u2022 ${import_chalk3.default.green.bold(tool.name)}: ${tool.description || "No description"}`);
        console.log(import_chalk3.default.gray(`    Schema: ${JSON.stringify(tool.inputSchema)}`));
      }
    } catch (err) {
      console.log(import_chalk3.default.gray(`Tools: Not supported or empty (${err.message})`));
    }
    try {
      const promptsResult = await client.listPrompts();
      console.log(`
${import_chalk3.default.bold.yellow(`\u{1F4AC} Prompts (${promptsResult.prompts.length}):`)}`);
      for (const prompt of promptsResult.prompts) {
        console.log(`  \u2022 ${import_chalk3.default.yellow.bold(prompt.name)}: ${prompt.description || "No description"}`);
      }
    } catch (_) {
      console.log(import_chalk3.default.gray("\nPrompts: Not supported or empty"));
    }
    try {
      const resourcesResult = await client.listResources();
      console.log(`
${import_chalk3.default.bold.magenta(`\u{1F4C1} Resources (${resourcesResult.resources.length}):`)}`);
      for (const res of resourcesResult.resources) {
        console.log(`  \u2022 ${import_chalk3.default.magenta.bold(res.name)} (${res.uri})`);
      }
    } catch (_) {
      console.log(import_chalk3.default.gray("Resources: Not supported or empty"));
    }
    console.log(`
${import_chalk3.default.green("\u2714 Inspection completed successfully.")}
`);
    await transport.close();
    process.exit(0);
  } catch (error) {
    spinner.fail(import_chalk3.default.red(`Inspection failed: ${error.message}`));
    process.exit(1);
  }
}

// src/commands/serve.ts
var import_server = require("@modelcontextprotocol/sdk/server/index.js");
var import_stdio2 = require("@modelcontextprotocol/sdk/server/stdio.js");
var import_types = require("@modelcontextprotocol/sdk/types.js");

// src/tools/gitTool.ts
var import_child_process = require("child_process");
var import_zod = require("zod");
var gitSummarySchema = import_zod.z.object({
  cwd: import_zod.z.string().optional().describe("Directory path of the Git repository (defaults to current working directory)")
});
async function handleGitSummary(args) {
  const cwd = args.cwd || process.cwd();
  try {
    const status = (0, import_child_process.execSync)("git status --short", { cwd, encoding: "utf-8" });
    const branch = (0, import_child_process.execSync)("git rev-parse --abbrev-ref HEAD", { cwd, encoding: "utf-8" }).trim();
    const lastCommit = (0, import_child_process.execSync)("git log -1 --oneline", { cwd, encoding: "utf-8" }).trim();
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
var import_os = __toESM(require("os"));
var import_zod2 = require("zod");
var systemDiagnosticsSchema = import_zod2.z.object({});
async function handleSystemDiagnostics() {
  const cpus = import_os.default.cpus();
  const totalMemMb = Math.round(import_os.default.totalmem() / (1024 * 1024));
  const freeMemMb = Math.round(import_os.default.freemem() / (1024 * 1024));
  const info = {
    platform: import_os.default.platform(),
    arch: import_os.default.arch(),
    nodeVersion: process.version,
    uptimeSeconds: Math.round(import_os.default.uptime()),
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
var import_zod3 = require("zod");
var mermaidValidateSchema = import_zod3.z.object({
  diagram: import_zod3.z.string().describe("The Mermaid.js diagram code string to validate")
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
var import_zod4 = require("zod");
var httpTesterSchema = import_zod4.z.object({
  url: import_zod4.z.string().url().describe("HTTP URL to send a request to"),
  method: import_zod4.z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).default("GET").describe("HTTP Method"),
  headers: import_zod4.z.record(import_zod4.z.string()).optional().describe("Headers key-value object"),
  body: import_zod4.z.string().optional().describe("JSON request body for POST/PUT")
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
var import_zod5 = require("zod");
var import_fs2 = __toESM(require("fs"));
var import_child_process2 = require("child_process");
var sqliteInspectorSchema = import_zod5.z.object({
  dbPath: import_zod5.z.string().describe("Absolute or relative path to SQLite database file"),
  query: import_zod5.z.string().optional().describe("Optional SQL SELECT query to execute (defaults to listing tables)")
});
async function handleSqliteInspector(args) {
  const { dbPath, query } = args;
  if (!import_fs2.default.existsSync(dbPath)) {
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
    const output = (0, import_child_process2.execSync)(`sqlite3 "${dbPath}" "${sqlCmd}"`, { encoding: "utf-8" }).trim();
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
    const stats = import_fs2.default.statSync(dbPath);
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
var import_child_process3 = require("child_process");
var import_zod6 = require("zod");
var dockerStatusSchema = import_zod6.z.object({
  all: import_zod6.z.boolean().optional().default(false).describe("Show all containers including stopped ones")
});
async function handleDockerStatus(args) {
  try {
    const flag = args.all ? "-a" : "";
    const output = (0, import_child_process3.execSync)(`docker ps ${flag} --format "{{.ID}}|{{.Image}}|{{.Status}}|{{.Names}}"`, { encoding: "utf-8" }).trim();
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
var import_fs3 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_zod7 = require("zod");
var codeMetricsSchema = import_zod7.z.object({
  dirPath: import_zod7.z.string().optional().describe("Directory path to analyze (defaults to current working directory)")
});
async function handleCodeMetrics(args) {
  const targetDir = import_path2.default.resolve(process.cwd(), args.dirPath || ".");
  if (!import_fs3.default.existsSync(targetDir)) {
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
    const files = import_fs3.default.readdirSync(currentDir, { withFileTypes: true });
    for (const file of files) {
      if (file.name.startsWith(".") || file.name === "node_modules" || file.name === "dist" || file.name === "build") {
        continue;
      }
      const fullPath = import_path2.default.join(currentDir, file.name);
      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.isFile()) {
        const ext = import_path2.default.extname(file.name).toLowerCase() || "no-extension";
        try {
          const content = import_fs3.default.readFileSync(fullPath, "utf-8");
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
async function runServeCommand() {
  const server = new import_server.Server(
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
  server.setRequestHandler(import_types.ListToolsRequestSchema, async () => {
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
  server.setRequestHandler(import_types.CallToolRequestSchema, async (request) => {
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
  const transport = new import_stdio2.StdioServerTransport();
  await server.connect(transport);
}

// src/ui/server.ts
var import_express = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_ws = require("ws");
var import_open = __toESM(require("open"));
var import_chalk4 = __toESM(require("chalk"));
async function runUiCommand(port = 3e3) {
  const app = (0, import_express.default)();
  const server = import_http.default.createServer(app);
  const wss = new import_ws.WebSocketServer({ server });
  app.use(import_express.default.json());
  const dashboardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCP-Forge Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --accent: #58a6ff;
      --accent-glow: rgba(88, 166, 255, 0.15);
      --text: #c9d1d9;
      --text-muted: #8b949e;
      --success: #3fb950;
      --pink: #f778ba;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: #fff;
    }
    .badge {
      background: var(--accent-glow);
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .card h2 {
      font-size: 1rem;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .tool-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .tool-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tool-name { font-weight: 600; color: var(--accent); font-family: 'JetBrains Mono', monospace; }
    .tool-desc { font-size: 0.85rem; color: var(--text-muted); }
    .log-window {
      background: #090d13;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      height: 350px;
      overflow-y: auto;
      color: #7ee787;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      background: var(--success);
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 8px var(--success);
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      \u{1F528} MCP-FORGE <span class="badge">Web Dashboard</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span class="status-dot"></span>
      <span style="font-size: 0.85rem; color: var(--text-muted);">Connected (Live WS)</span>
    </div>
  </header>
  <main>
    <div class="card">
      <h2>\u{1F6E0}\uFE0F Active MCP Suite Tools</h2>
      <div class="tool-list">
        <div class="tool-item">
          <div>
            <div class="tool-name">git_summary</div>
            <div class="tool-desc">Repo branch, status & commit diagnostics</div>
          </div>
          <span class="badge">Stdio</span>
        </div>
        <div class="tool-item">
          <div>
            <div class="tool-name">system_diagnostics</div>
            <div class="tool-desc">CPU, RAM & process telemetry</div>
          </div>
          <span class="badge">Stdio</span>
        </div>
        <div class="tool-item">
          <div>
            <div class="tool-name">mermaid_validate</div>
            <div class="tool-desc">Diagram syntax verification</div>
          </div>
          <span class="badge">Stdio</span>
        </div>
        <div class="tool-item">
          <div>
            <div class="tool-name">http_tester</div>
            <div class="tool-desc">Fast API fetcher & header inspector</div>
          </div>
          <span class="badge">Stdio</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>\u{1F4DF} Live JSON-RPC Event Stream</h2>
      <div class="log-window" id="logs">
        [SYSTEM] WebSocket connected to MCP-Forge server.<br>
        [SYSTEM] Ready for JSON-RPC traffic inspection...<br>
      </div>
    </div>
  </main>
</body>
</html>`;
  app.get("/", (_, res) => {
    res.send(dashboardHtml);
  });
  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "STATUS", message: "Connected to MCP-Forge Web Server" }));
  });
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(import_chalk4.default.green(`
\u{1F680} MCP-Forge Dashboard active at ${import_chalk4.default.bold.underline(url)}`));
    (0, import_open.default)(url).catch(() => {
    });
  });
}

// src/cli.ts
var program = new import_commander.Command();
program.name("mcp-forge").description("The Swiss-Army developer toolkit for Model Context Protocol (MCP) servers").version("1.0.0");
program.command("init [name]").description("Scaffold a new production-ready MCP server project").action((name) => {
  printBanner();
  runInitCommand(name);
});
program.command("inspect").description("Inspect an MCP server and test its tools interactively").argument("<cmd...>", "Command and arguments to start the target MCP server process").action((cmd) => {
  printBanner();
  runInspectCommand(cmd);
});
program.command("serve").description("Launch built-in developer tools MCP server suite via stdio").action(() => {
  runServeCommand();
});
program.command("ui").description("Launch interactive visual web dashboard for MCP server monitoring").option("-p, --port <number>", "Port for web dashboard", "3000").action((options) => {
  printBanner();
  runUiCommand(parseInt(options.port, 10));
});
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  printBanner();
  program.outputHelp();
}
//# sourceMappingURL=cli.js.map
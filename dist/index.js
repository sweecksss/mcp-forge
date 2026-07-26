#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  gitSummarySchema: () => gitSummarySchema,
  handleGitSummary: () => handleGitSummary,
  handleHttpTester: () => handleHttpTester,
  handleMermaidValidate: () => handleMermaidValidate,
  handleSystemDiagnostics: () => handleSystemDiagnostics,
  httpTesterSchema: () => httpTesterSchema,
  mermaidValidateSchema: () => mermaidValidateSchema,
  runInitCommand: () => runInitCommand,
  runServeCommand: () => runServeCommand,
  systemDiagnosticsSchema: () => systemDiagnosticsSchema
});
module.exports = __toCommonJS(src_exports);

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

// src/commands/serve.ts
var import_server = require("@modelcontextprotocol/sdk/server/index.js");
var import_stdio = require("@modelcontextprotocol/sdk/server/stdio.js");
var import_types = require("@modelcontextprotocol/sdk/types.js");
async function runServeCommand() {
  const server = new import_server.Server(
    {
      name: "mcp-forge-suite",
      version: "1.0.0"
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
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });
  const transport = new import_stdio.StdioServerTransport();
  await server.connect(transport);
}

// src/commands/init.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_chalk = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));
async function runInitCommand(projectName) {
  const targetName = projectName || "my-mcp-server";
  const targetDir = import_path.default.resolve(process.cwd(), targetName);
  if (import_fs.default.existsSync(targetDir)) {
    console.error(import_chalk.default.red(`Error: Directory '${targetName}' already exists!`));
    process.exit(1);
  }
  const spinner = (0, import_ora.default)(`Scaffolding MCP Server in ${import_chalk.default.bold(targetName)}...`).start();
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
    spinner.succeed(import_chalk.default.green(`Successfully scaffolded ${import_chalk.default.bold(targetName)}!`));
    console.log(`
Next steps:`);
    console.log(`  ${import_chalk.default.cyan(`cd ${targetName}`)}`);
    console.log(`  ${import_chalk.default.cyan(`npm install`)}`);
    console.log(`  ${import_chalk.default.cyan(`npm run dev`)}
`);
  } catch (error) {
    spinner.fail(import_chalk.default.red(`Failed to scaffold project: ${error.message}`));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gitSummarySchema,
  handleGitSummary,
  handleHttpTester,
  handleMermaidValidate,
  handleSystemDiagnostics,
  httpTesterSchema,
  mermaidValidateSchema,
  runInitCommand,
  runServeCommand,
  systemDiagnosticsSchema
});
//# sourceMappingURL=index.js.map
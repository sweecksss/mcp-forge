import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { gitSummarySchema, handleGitSummary } from '../tools/gitTool.js';
import { systemDiagnosticsSchema, handleSystemDiagnostics } from '../tools/systemTool.js';
import { mermaidValidateSchema, handleMermaidValidate } from '../tools/mermaidTool.js';
import { httpTesterSchema, handleHttpTester } from '../tools/httpTool.js';
import { sqliteInspectorSchema, handleSqliteInspector } from '../tools/sqliteTool.js';
import { dockerStatusSchema, handleDockerStatus } from '../tools/dockerTool.js';
import { codeMetricsSchema, handleCodeMetrics } from '../tools/codeMetricsTool.js';

export async function runServeCommand() {
  const server = new Server(
    {
      name: 'mcp-forge-suite',
      version: '1.1.0'
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
          name: 'git_summary',
          description: 'Get status, branch, and last commit summary of a Git repository',
          inputSchema: {
            type: 'object',
            properties: {
              cwd: { type: 'string', description: 'Repository directory path' }
            }
          }
        },
        {
          name: 'system_diagnostics',
          description: 'Get CPU, memory, uptime, and system platform information',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'mermaid_validate',
          description: 'Validate Mermaid.js diagram syntax structure',
          inputSchema: {
            type: 'object',
            properties: {
              diagram: { type: 'string', description: 'Mermaid diagram text' }
            },
            required: ['diagram']
          }
        },
        {
          name: 'http_tester',
          description: 'Send an HTTP GET/POST request and return status, duration, headers, and body',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'Request URL' },
              method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
              headers: { type: 'object', description: 'Request headers' },
              body: { type: 'string', description: 'Request body' }
            },
            required: ['url']
          }
        },
        {
          name: 'sqlite_inspector',
          description: 'Inspect tables and execute read-only queries on local SQLite databases',
          inputSchema: {
            type: 'object',
            properties: {
              dbPath: { type: 'string', description: 'Path to SQLite database file' },
              query: { type: 'string', description: 'SQL SELECT query to execute' }
            },
            required: ['dbPath']
          }
        },
        {
          name: 'docker_status',
          description: 'Inspect active Docker containers, statuses, and names',
          inputSchema: {
            type: 'object',
            properties: {
              all: { type: 'boolean', description: 'Include stopped containers' }
            }
          }
        },
        {
          name: 'code_metrics',
          description: 'Analyze codebase line count (LOC), total files, and language breakdown',
          inputSchema: {
            type: 'object',
            properties: {
              dirPath: { type: 'string', description: 'Directory path to analyze' }
            }
          }
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'git_summary':
        return await handleGitSummary(gitSummarySchema.parse(args || {}));

      case 'system_diagnostics':
        return await handleSystemDiagnostics();

      case 'mermaid_validate':
        return await handleMermaidValidate(mermaidValidateSchema.parse(args || {}));

      case 'http_tester':
        return await handleHttpTester(httpTesterSchema.parse(args || {}));

      case 'sqlite_inspector':
        return await handleSqliteInspector(sqliteInspectorSchema.parse(args || {}));

      case 'docker_status':
        return await handleDockerStatus(dockerStatusSchema.parse(args || {}));

      case 'code_metrics':
        return await handleCodeMetrics(codeMetricsSchema.parse(args || {}));

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

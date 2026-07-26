import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import chalk from 'chalk';
import ora from 'ora';

export async function runInspectCommand(commandArgs: string[]) {
  if (commandArgs.length === 0) {
    console.error(chalk.red('Error: Please provide the command to run the target MCP server.'));
    console.log(chalk.yellow('Example: mcp-forge inspect node ./dist/index.js'));
    process.exit(1);
  }

  const [cmd, ...args] = commandArgs;
  console.log(chalk.blue(`Connecting to MCP server via stdio: ${chalk.bold([cmd, ...args].join(' '))}`));

  const spinner = ora('Initializing Stdio Transport...').start();

  try {
    const transport = new StdioClientTransport({
      command: cmd,
      args
    });

    const client = new Client(
      {
        name: 'mcp-forge-inspector',
        version: '1.0.0'
      },
      {
        capabilities: {}
      }
    );

    await client.connect(transport);
    spinner.succeed(chalk.green('Successfully connected to MCP Server!'));

    console.log(`\n${chalk.bgBlue.white.bold(' SERVER INSPECTION ')}\n`);

    // List tools
    try {
      const toolsResult = await client.listTools();
      console.log(chalk.bold.cyan(`🛠️  Tools (${toolsResult.tools.length}):`));
      for (const tool of toolsResult.tools) {
        console.log(`  • ${chalk.green.bold(tool.name)}: ${tool.description || 'No description'}`);
        console.log(chalk.gray(`    Schema: ${JSON.stringify(tool.inputSchema)}`));
      }
    } catch (err: any) {
      console.log(chalk.gray(`Tools: Not supported or empty (${err.message})`));
    }

    // List prompts
    try {
      const promptsResult = await client.listPrompts();
      console.log(`\n${chalk.bold.yellow(`💬 Prompts (${promptsResult.prompts.length}):`)}`);
      for (const prompt of promptsResult.prompts) {
        console.log(`  • ${chalk.yellow.bold(prompt.name)}: ${prompt.description || 'No description'}`);
      }
    } catch (_) {
      console.log(chalk.gray('\nPrompts: Not supported or empty'));
    }

    // List resources
    try {
      const resourcesResult = await client.listResources();
      console.log(`\n${chalk.bold.magenta(`📁 Resources (${resourcesResult.resources.length}):`)}`);
      for (const res of resourcesResult.resources) {
        console.log(`  • ${chalk.magenta.bold(res.name)} (${res.uri})`);
      }
    } catch (_) {
      console.log(chalk.gray('Resources: Not supported or empty'));
    }

    console.log(`\n${chalk.green('✔ Inspection completed successfully.')}\n`);
    await transport.close();
    process.exit(0);
  } catch (error: any) {
    spinner.fail(chalk.red(`Inspection failed: ${error.message}`));
    process.exit(1);
  }
}

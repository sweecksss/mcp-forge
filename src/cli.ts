import { Command } from 'commander';
import { printBanner } from './utils/banner.js';
import { runInitCommand } from './commands/init.js';
import { runInspectCommand } from './commands/inspect.js';
import { runServeCommand } from './commands/serve.js';
import { runUiCommand } from './ui/server.js';

const program = new Command();

program
  .name('mcp-forge')
  .description('The Swiss-Army developer toolkit for Model Context Protocol (MCP) servers')
  .version('1.0.0');

program
  .command('init [name]')
  .description('Scaffold a new production-ready MCP server project')
  .action((name) => {
    printBanner();
    runInitCommand(name);
  });

program
  .command('inspect')
  .description('Inspect an MCP server and test its tools interactively')
  .argument('<cmd...>', 'Command and arguments to start the target MCP server process')
  .action((cmd) => {
    printBanner();
    runInspectCommand(cmd);
  });

program
  .command('serve')
  .description('Launch built-in developer tools MCP server suite via stdio')
  .action(() => {
    runServeCommand();
  });

program
  .command('ui')
  .description('Launch interactive visual web dashboard for MCP server monitoring')
  .option('-p, --port <number>', 'Port for web dashboard', '3000')
  .action((options) => {
    printBanner();
    runUiCommand(parseInt(options.port, 10));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  printBanner();
  program.outputHelp();
}

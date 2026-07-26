import chalk from 'chalk';

export function getBanner(): string {
  const logo = `
   ${chalk.hex('#FF6B6B').bold('███╗   ███╗██████╗██████╗ ')}    ${chalk.hex('#4D96FF').bold('███████╗██████╗ ██████╗  ██████╗ ███████╗')}
   ${chalk.hex('#FF6B6B').bold('████╗ ████║██╔════╝██╔══██╗')}    ${chalk.hex('#4D96FF').bold('██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝')}
   ${chalk.hex('#FF8E53').bold('██╔████╔██║██║     ██████╔╝')}    ${chalk.hex('#6BCB77').bold('█████╗  ██████╔╝██████╔╝██║  ███╗█████╗  ')}
   ${chalk.hex('#FF8E53').bold('██║╚██╔╝██║██║     ██╔═══╝ ')}    ${chalk.hex('#6BCB77').bold('██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══╝  ')}
   ${chalk.hex('#FFD93D').bold('██║ ╚═╝ ██║╚██████╗██║     ')}    ${chalk.hex('#FFD93D').bold('██║     ██║  ██║██║  ██║╚██████╔╝███████╗')}
   ${chalk.hex('#FFD93D').bold('╚═╝     ╚═╝ ╚═════╝╚═╝     ')}    ${chalk.hex('#FFD93D').bold('╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝')}
  `;

  const tag = `  ${chalk.bgHex('#4D96FF').white.bold(' MCP-FORGE ')} ${chalk.dim('v1.0.0')} — ${chalk.gray('The Swiss-Army Developer Toolkit for MCP Servers')}`;
  return `${logo}\n${tag}\n`;
}

export function printBanner(): void {
  console.log(getBanner());
}

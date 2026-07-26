# 🔨 mcp-forge

> **The Swiss-Army Developer Toolkit & Inspector for Model Context Protocol (MCP) Servers**

[![NPM Version](https://img.shields.io/npm/v/mcp-forge.svg?style=flat-square&color=58a6ff)](https://www.npmjs.com/package/mcp-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![MCP Approved](https://img.shields.io/badge/MCP-1.1-7ee787.svg?style=flat-square)](https://modelcontextprotocol.io)
[![sweecksss/mcp-forge MCP server](https://glama.ai/mcp/servers/sweecksss/mcp-forge/badges/score.svg)](https://glama.ai/mcp/servers/sweecksss/mcp-forge)

```
   ███╗   ███╗██████╗██████╗     ███████╗██████╗ ██████╗  ██████╗ ███████╗
   ████╗ ████║██╔════╝██╔══██╗    ██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝
   ██╔████╔██║██║     ██████╔╝    █████╗  ██████╔╝██████╔╝██║  ███╗█████╗  
   ██║╚██╔╝██║██║     ██╔═══╝     ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══╝  
   ██║ ╚═╝ ██║╚██████╗██║         ██║     ██║  ██║██║  ██║╚██████╔╝███████╗
   ╚═╝     ╚═╝ ╚═════╝╚═╝         ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

**`mcp-forge`** is an open-source, ultra-fast developer toolkit for building, testing, inspecting, and serving [Model Context Protocol (MCP)](https://modelcontextprotocol.io) servers. Designed for Node.js & TypeScript, it seamlessly connects with **Claude Desktop**, **Cursor**, **Windsurf**, and custom LLM workflows.

---

## ✨ Features

- 🛠️ **Instant Scaffolding (`mcp-forge init`)**: Generate a production-ready TypeScript MCP server with full type safety, build scripts, and test suite in 5 seconds.
- 🔍 **Interactive CLI Inspector (`mcp-forge inspect`)**: Connect to any stdio MCP server process, inspect declared `tools`, `prompts`, and `resources`, and trace JSON-RPC traffic.
- 🧰 **Built-in Server Suite (`mcp-forge serve`)**: Ready-to-use developer tool server providing Git status summary, system diagnostics, Mermaid diagram syntax validation, and HTTP API testing.
- 🌐 **Visual Web Dashboard (`mcp-forge ui`)**: Modern dark-themed web browser interface to inspect and monitor MCP servers visually.
- 🔌 **Extensible Plugin Ecosystem**: Simple architecture making it easy for open-source contributors to add custom MCP tools.

---

## ⚡ Quickstart

No installation required! Run directly using `npx`:

```bash
# 1. Scaffold a new MCP server
npx mcp-forge init my-custom-server

# 2. Inspect any existing MCP server process
npx mcp-forge inspect node ./dist/index.js

# 3. Launch built-in developer suite for Claude
npx mcp-forge serve

# 4. Open visual Web Dashboard
npx mcp-forge ui
```

---

## 🤖 Connecting `mcp-forge serve` to Claude Desktop

Add the following snippet to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-forge": {
      "command": "npx",
      "args": ["-y", "mcp-forge", "serve"]
    }
  }
}
```

Now Claude can inspect your Git workspace, perform system diagnostics, validate Mermaid charts, and test REST endpoints automatically!

---

## 🛠️ Commands Reference

| Command | Description |
| :--- | :--- |
| `mcp-forge init [name]` | Scaffolds a new MCP server project in `./[name]` |
| `mcp-forge inspect <cmd...>` | Inspects stdio MCP server tools, prompts, resources |
| `mcp-forge serve` | Runs the built-in MCP developer server via stdio |
| `mcp-forge ui [-p port]` | Launches local web dashboard (default port 3000) |

---

## 🤝 Contributing

We welcome contributions from developers worldwide! Whether you want to add a new built-in MCP tool, improve the CLI inspector, or fix bugs, check out our **[CONTRIBUTING.md](CONTRIBUTING.md)** guide.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/sweecksss/mcp-forge.git
cd mcp-forge

# Install dependencies
npm install

# Build & run tests
npm run build
npm test
```

---

## 📄 License

[MIT License](LICENSE) © 2026 mcp-forge Contributors

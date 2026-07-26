import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import open from 'open';
import chalk from 'chalk';

export async function runUiCommand(port: number = 3000) {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json());

  // HTML Web Dashboard UI (Modern Dark Theme)
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
      🔨 MCP-FORGE <span class="badge">Web Dashboard</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span class="status-dot"></span>
      <span style="font-size: 0.85rem; color: var(--text-muted);">Connected (Live WS)</span>
    </div>
  </header>
  <main>
    <div class="card">
      <h2>🛠️ Active MCP Suite Tools</h2>
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
      <h2>📟 Live JSON-RPC Event Stream</h2>
      <div class="log-window" id="logs">
        [SYSTEM] WebSocket connected to MCP-Forge server.<br>
        [SYSTEM] Ready for JSON-RPC traffic inspection...<br>
      </div>
    </div>
  </main>
</body>
</html>`;

  app.get('/', (_, res) => {
    res.send(dashboardHtml);
  });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'STATUS', message: 'Connected to MCP-Forge Web Server' }));
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.green(`\n🚀 MCP-Forge Dashboard active at ${chalk.bold.underline(url)}`));
    open(url).catch(() => {});
  });
}

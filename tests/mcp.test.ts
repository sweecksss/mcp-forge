import { describe, it, expect } from 'vitest';
import { handleMermaidValidate } from '../src/tools/mermaidTool.js';
import { handleSystemDiagnostics } from '../src/tools/systemTool.js';
import { handleCodeMetrics } from '../src/tools/codeMetricsTool.js';
import { handleSqliteInspector } from '../src/tools/sqliteTool.js';
import { handleDockerStatus } from '../src/tools/dockerTool.js';

describe('mcp-forge Built-in Tools', () => {
  it('should validate correct Mermaid diagram syntax', async () => {
    const res = await handleMermaidValidate({ diagram: 'flowchart TD\n A-->B' });
    expect(res.isError).toBeUndefined();
    const data = JSON.parse(res.content[0].text);
    expect(data.valid).toBe(true);
    expect(data.type).toBe('flowchart');
  });

  it('should reject invalid Mermaid diagram syntax', async () => {
    const res = await handleMermaidValidate({ diagram: 'invalidDiagramCode\n A-->B' });
    expect(res.isError).toBe(true);
    expect(res.content[0].text).toContain('Validation Failed');
  });

  it('should return valid system diagnostics', async () => {
    const res = await handleSystemDiagnostics();
    const data = JSON.parse(res.content[0].text);
    expect(data.platform).toBeDefined();
    expect(data.cpuCores).toBeGreaterThan(0);
    expect(data.memory.totalMb).toBeGreaterThan(0);
  });

  it('should analyze codebase metrics', async () => {
    const res = await handleCodeMetrics({ dirPath: '.' });
    expect(res.isError).toBeUndefined();
    const data = JSON.parse(res.content[0].text);
    expect(data.totalFiles).toBeGreaterThan(0);
    expect(data.totalLines).toBeGreaterThan(0);
  });

  it('should handle SQLite non-existent DB gracefully', async () => {
    const res = await handleSqliteInspector({ dbPath: './non-existent-db.sqlite' });
    expect(res.isError).toBe(true);
    expect(res.content[0].text).toContain('Database Error');
  });

  it('should return docker status or error safely', async () => {
    const res = await handleDockerStatus({});
    expect(res.content[0].text).toBeDefined();
  });
});

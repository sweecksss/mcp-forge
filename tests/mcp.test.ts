import { describe, it, expect } from 'vitest';
import { handleMermaidValidate } from '../src/tools/mermaidTool.js';
import { handleSystemDiagnostics } from '../src/tools/systemTool.js';

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
});

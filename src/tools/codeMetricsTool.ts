import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export const codeMetricsSchema = z.object({
  dirPath: z.string().optional().describe('Directory path to analyze (defaults to current working directory)')
});

export async function handleCodeMetrics(args: z.infer<typeof codeMetricsSchema>) {
  const targetDir = path.resolve(process.cwd(), args.dirPath || '.');

  if (!fs.existsSync(targetDir)) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Error: Directory path '${targetDir}' does not exist.`
        }
      ],
      isError: true
    };
  }

  const extensionCounts: Record<string, { files: number; lines: number }> = {};
  let totalFiles = 0;
  let totalLines = 0;

  function walk(currentDir: string) {
    const files = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const file of files) {
      if (file.name.startsWith('.') || file.name === 'node_modules' || file.name === 'dist' || file.name === 'build') {
        continue;
      }

      const fullPath = path.join(currentDir, file.name);
      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase() || 'no-extension';
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const lines = content.split('\n').length;

          totalFiles++;
          totalLines += lines;

          if (!extensionCounts[ext]) {
            extensionCounts[ext] = { files: 0, lines: 0 };
          }
          extensionCounts[ext].files++;
          extensionCounts[ext].lines += lines;
        } catch (_) {
          // Skip binary files
        }
      }
    }
  }

  walk(targetDir);

  return {
    content: [
      {
        type: 'text' as const,
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

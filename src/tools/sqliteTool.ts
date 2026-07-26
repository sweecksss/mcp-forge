import { z } from 'zod';
import fs from 'fs';
import { execSync } from 'child_process';

export const sqliteInspectorSchema = z.object({
  dbPath: z.string().describe('Absolute or relative path to SQLite database file'),
  query: z.string().optional().describe('Optional SQL SELECT query to execute (defaults to listing tables)')
});

export async function handleSqliteInspector(args: z.infer<typeof sqliteInspectorSchema>) {
  const { dbPath, query } = args;

  if (!fs.existsSync(dbPath)) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Database Error: SQLite file not found at path '${dbPath}'`
        }
      ],
      isError: true
    };
  }

  try {
    const sqlCmd = query || '.tables';
    const output = execSync(`sqlite3 "${dbPath}" "${sqlCmd}"`, { encoding: 'utf-8' }).trim();

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              dbPath,
              queryExecuted: sqlCmd,
              result: output || 'Query executed successfully with empty result.'
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error: any) {
    // If sqlite3 CLI is not installed, fallback to file inspection telemetry
    const stats = fs.statSync(dbPath);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              dbPath,
              sizeBytes: stats.size,
              lastModified: stats.mtime,
              note: `SQLite CLI fallback mode active. File size: ${stats.size} bytes.`
            },
            null,
            2
          )
        }
      ]
    };
  }
}

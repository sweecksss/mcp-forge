import { execSync } from 'child_process';
import { z } from 'zod';

export const gitSummarySchema = z.object({
  cwd: z.string().optional().describe('Directory path of the Git repository (defaults to current working directory)')
});

export async function handleGitSummary(args: z.infer<typeof gitSummarySchema>) {
  const cwd = args.cwd || process.cwd();
  try {
    const status = execSync('git status --short', { cwd, encoding: 'utf-8' });
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd, encoding: 'utf-8' }).trim();
    const lastCommit = execSync('git log -1 --oneline', { cwd, encoding: 'utf-8' }).trim();

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              branch,
              lastCommit,
              uncommittedChanges: status.split('\n').filter(Boolean).length,
              statusOutput: status || 'Clean working tree'
            },
            null,
            2
          )
        }
      ]
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Git Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
}

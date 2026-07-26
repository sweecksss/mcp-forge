import { execSync } from 'child_process';
import { z } from 'zod';

export const dockerStatusSchema = z.object({
  all: z.boolean().optional().default(false).describe('Show all containers including stopped ones')
});

export async function handleDockerStatus(args: z.infer<typeof dockerStatusSchema>) {
  try {
    const flag = args.all ? '-a' : '';
    const output = execSync(`docker ps ${flag} --format "{{.ID}}|{{.Image}}|{{.Status}}|{{.Names}}"`, { encoding: 'utf-8' }).trim();

    if (!output) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ activeContainers: 0, containers: [] }, null, 2)
          }
        ]
      };
    }

    const containers = output.split('\n').map((line) => {
      const [id, image, status, name] = line.split('|');
      return { id, image, status, name };
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              activeContainers: containers.length,
              containers
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
          text: `Docker Error: Docker daemon not running or not installed (${error.message})`
        }
      ],
      isError: true
    };
  }
}

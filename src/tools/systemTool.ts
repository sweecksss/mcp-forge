import os from 'os';
import { z } from 'zod';

export const systemDiagnosticsSchema = z.object({});

export async function handleSystemDiagnostics() {
  const cpus = os.cpus();
  const totalMemMb = Math.round(os.totalmem() / (1024 * 1024));
  const freeMemMb = Math.round(os.freemem() / (1024 * 1024));

  const info = {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    uptimeSeconds: Math.round(os.uptime()),
    cpuModel: cpus.length > 0 ? cpus[0].model : 'Unknown',
    cpuCores: cpus.length,
    memory: {
      totalMb: totalMemMb,
      freeMb: freeMemMb,
      usedMb: totalMemMb - freeMemMb
    }
  };

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(info, null, 2)
      }
    ]
  };
}

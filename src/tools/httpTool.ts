import { z } from 'zod';

export const httpTesterSchema = z.object({
  url: z.string().url().describe('HTTP URL to send a request to'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).default('GET').describe('HTTP Method'),
  headers: z.record(z.string()).optional().describe('Headers key-value object'),
  body: z.string().optional().describe('JSON request body for POST/PUT')
});

export async function handleHttpTester(args: z.infer<typeof httpTesterSchema>) {
  try {
    const startTime = Date.now();
    const options: RequestInit = {
      method: args.method,
      headers: args.headers || {}
    };

    if (args.body && ['POST', 'PUT', 'PATCH'].includes(args.method)) {
      options.body = args.body;
      if (!options.headers) options.headers = {};
      (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    const response = await fetch(args.url, options);
    const durationMs = Date.now() - startTime;

    const responseText = await response.text();
    let parsedBody: any = responseText;
    try {
      parsedBody = JSON.parse(responseText);
    } catch (_) {}

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: response.status,
              statusText: response.statusText,
              durationMs,
              headers: Object.fromEntries(response.headers.entries()),
              body: parsedBody
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
          text: `HTTP Request Failed: ${error.message}`
        }
      ],
      isError: true
    };
  }
}

# Contributing to mcp-forge 🚀

Thank you for your interest in contributing to **mcp-forge**! We are building the open-source standard developer toolkit for Model Context Protocol (MCP) servers.

---

## 🌟 How You Can Contribute

There are many ways to contribute:

1. **Add a New Built-in MCP Tool**: Add a tool to `src/tools/` (e.g. SQLite inspector, Docker status tool, JSON schema validator).
2. **Improve the CLI Inspector**: Enhance `src/commands/inspect.ts` with interactive prompt testing or live log filtering.
3. **Enhance Web UI**: Improve the dashboard in `src/ui/server.ts`.
4. **Documentation**: Add examples, tutorials, or translate docs.

---

## 🛠️ Step-by-Step: Adding a New MCP Tool

1. Create a new tool file in `src/tools/myTool.ts`:
   ```typescript
   import { z } from 'zod';

   export const myToolSchema = z.object({
     query: z.string().describe('Search query string')
   });

   export async function handleMyTool(args: z.infer<typeof myToolSchema>) {
     return {
       content: [{ type: 'text' as const, text: `Result for ${args.query}` }]
     };
   }
   ```

2. Register your tool in `src/commands/serve.ts`:
   - Add tool definition in `ListToolsRequestSchema` handler.
   - Add tool invocation logic in `CallToolRequestSchema` handler.

3. Add a unit test in `tests/mcp.test.ts`.

4. Submit a Pull Request!

---

## 📬 Pull Request Guidelines

- Ensure `npm run typecheck` and `npm test` pass cleanly without errors.
- Keep PRs focused on a single feature or bugfix.
- Follow standard semantic commit messages (e.g. `feat: add SQLite MCP tool`, `fix: resolve stdio transport buffer leak`).

Thank you for helping build the future of MCP open source! ❤️

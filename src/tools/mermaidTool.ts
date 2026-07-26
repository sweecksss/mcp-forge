import { z } from 'zod';

export const mermaidValidateSchema = z.object({
  diagram: z.string().describe('The Mermaid.js diagram code string to validate')
});

export async function handleMermaidValidate(args: z.infer<typeof mermaidValidateSchema>) {
  const { diagram } = args;
  const validKeywords = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'gantt', 'pie', 'gitGraph', 'mindmap', 'timeline', 'architecture'];

  const trimmed = diagram.trim();
  const firstWord = trimmed.split(/\s+/)[0];

  const isValidType = validKeywords.some((kw) => firstWord.startsWith(kw));

  if (!isValidType) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Validation Failed: Diagram must start with a valid Mermaid diagram type (e.g. flowchart, graph, sequenceDiagram). Found '${firstWord}'.`
        }
      ],
      isError: true
    };
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(
          {
            valid: true,
            type: firstWord,
            lineCount: trimmed.split('\n').length,
            message: 'Mermaid diagram syntax structure is valid.'
          },
          null,
          2
        )
      }
    ]
  };
}

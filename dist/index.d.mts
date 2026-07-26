import { z } from 'zod';

declare const gitSummarySchema: z.ZodObject<{
    cwd: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cwd?: string | undefined;
}, {
    cwd?: string | undefined;
}>;
declare function handleGitSummary(args: z.infer<typeof gitSummarySchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    isError?: undefined;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
}>;

declare const systemDiagnosticsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
declare function handleSystemDiagnostics(): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;

declare const mermaidValidateSchema: z.ZodObject<{
    diagram: z.ZodString;
}, "strip", z.ZodTypeAny, {
    diagram: string;
}, {
    diagram: string;
}>;
declare function handleMermaidValidate(args: z.infer<typeof mermaidValidateSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    isError?: undefined;
}>;

declare const httpTesterSchema: z.ZodObject<{
    url: z.ZodString;
    method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    url: string;
    headers?: Record<string, string> | undefined;
    body?: string | undefined;
}, {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
    headers?: Record<string, string> | undefined;
    body?: string | undefined;
}>;
declare function handleHttpTester(args: z.infer<typeof httpTesterSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    isError?: undefined;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
}>;

declare function runServeCommand(): Promise<void>;

declare function runInitCommand(projectName?: string): Promise<void>;

export { gitSummarySchema, handleGitSummary, handleHttpTester, handleMermaidValidate, handleSystemDiagnostics, httpTesterSchema, mermaidValidateSchema, runInitCommand, runServeCommand, systemDiagnosticsSchema };

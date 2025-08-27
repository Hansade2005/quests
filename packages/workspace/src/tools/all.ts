import { type InferUITools } from "ai";
import { type z } from "zod";

import type { AnyAgentTool, ToolName } from "./types";

import { Choose } from "./choose";
import { EditFile } from "./edit-file";
import { FileTree } from "./file-tree";
import { Glob } from "./glob";
import { Grep } from "./grep";
import { ReadFile } from "./read-file";
import { RunDiagnostics } from "./run-diagnostics";
import { RunGitCommands } from "./run-git-commands";
import { RunShellCommand } from "./run-shell-command";
import { Think } from "./think";
import { Unavailable } from "./unavailable";
import { WriteFile } from "./write-file";

export const TOOLS = {
  Choose,
  EditFile,
  FileTree,
  Glob,
  Grep,
  ReadFile,
  RunDiagnostics,
  RunGitCommands,
  RunShellCommand,
  Think,
  Unavailable,
  WriteFile,
};

export type InternalToolName = keyof typeof TOOLS;

export const TOOLS_BY_NAME = {
  [TOOLS.Choose.name]: TOOLS.Choose,
  [TOOLS.EditFile.name]: TOOLS.EditFile,
  [TOOLS.FileTree.name]: TOOLS.FileTree,
  [TOOLS.Glob.name]: TOOLS.Glob,
  [TOOLS.Grep.name]: TOOLS.Grep,
  [TOOLS.ReadFile.name]: TOOLS.ReadFile,
  [TOOLS.RunDiagnostics.name]: TOOLS.RunDiagnostics,
  [TOOLS.RunGitCommands.name]: TOOLS.RunGitCommands,
  [TOOLS.RunShellCommand.name]: TOOLS.RunShellCommand,
  [TOOLS.Think.name]: TOOLS.Think,
  [TOOLS.Unavailable.name]: TOOLS.Unavailable,
  [TOOLS.WriteFile.name]: TOOLS.WriteFile,
  // `satisfies` ensures all tool names are present
} as const satisfies Record<ToolName, AnyAgentTool>;

export const ALL_AI_SDK_TOOLS = Object.fromEntries(
  Object.values(TOOLS_BY_NAME).map((tool) => [tool.name, tool.aiSDKTool()]),
);

export type AISDKTools = InferUITools<{
  [K in keyof typeof TOOLS_BY_NAME]: ReturnType<
    (typeof TOOLS_BY_NAME)[K]["aiSDKTool"]
  >;
}>;

export type ToolOutputByName = {
  [K in ToolName]: {
    output: z.output<(typeof TOOLS_BY_NAME)[K]["outputSchema"]>;
    toolName: K;
  };
}[ToolName];

export function getToolByType<T extends ToolName>(
  type: `tool-${T}`,
): (typeof TOOLS_BY_NAME)[T] {
  const toolName = type.replace("tool-", "") as T;
  return TOOLS_BY_NAME[toolName];
}

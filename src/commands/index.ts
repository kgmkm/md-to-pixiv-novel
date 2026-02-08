import * as vscode from "vscode";
import { convertFile } from "./convertFile";
import { convertSelection } from "./convertSelection";

export function registerCommands(context: vscode.ExtensionContext): void {
  const convertFileCommand = vscode.commands.registerCommand(
    "md-to-pixiv-novel.convertFile",
    convertFile,
  );

  const convertSelectionCommand = vscode.commands.registerCommand(
    "md-to-pixiv-novel.convertSelection",
    convertSelection,
  );

  context.subscriptions.push(convertFileCommand, convertSelectionCommand);
}

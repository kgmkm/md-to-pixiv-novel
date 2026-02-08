import * as vscode from "vscode";
import { registerCommands } from "./commands";

export function activate(context: vscode.ExtensionContext): void {
  console.log("md-to-pixiv-novel is now active");
  registerCommands(context);
}

export function deactivate(): void {
  console.log("md-to-pixiv-novel is now deactivated");
}

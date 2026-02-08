import * as vscode from "vscode";
import { convertAll } from "../converters";
import { MESSAGES } from "../utils/messages";

export async function convertSelection(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage(MESSAGES.NO_ACTIVE_EDITOR);
    return;
  }

  const selection = editor.selection;

  if (selection.isEmpty) {
    vscode.window.showWarningMessage(MESSAGES.NO_SELECTION);
    return;
  }

  const selectedText = editor.document.getText(selection);
  const convertedText = convertAll(selectedText);

  if (selectedText === convertedText) {
    vscode.window.showInformationMessage(MESSAGES.NO_CONVERSION_TARGET);
    return;
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, convertedText);
  });

  vscode.window.showInformationMessage(MESSAGES.CONVERSION_COMPLETE);
}

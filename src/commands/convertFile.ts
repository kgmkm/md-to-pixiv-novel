import * as vscode from "vscode";
import { convertAll } from "../converters";
import { MESSAGES } from "../utils/messages";

export async function convertFile(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage(MESSAGES.NO_ACTIVE_EDITOR);
    return;
  }

  const document = editor.document;
  const fullText = document.getText();
  const convertedText = convertAll(fullText);

  if (fullText === convertedText) {
    vscode.window.showInformationMessage(MESSAGES.NO_CONVERSION_TARGET);
    return;
  }

  const fullRange = new vscode.Range(
    document.positionAt(0),
    document.positionAt(fullText.length),
  );

  await editor.edit((editBuilder) => {
    editBuilder.replace(fullRange, convertedText);
  });

  vscode.window.showInformationMessage(MESSAGES.CONVERSION_COMPLETE);
}

import * as assert from "assert";
import * as vscode from "vscode";

suite("Command Tests", () => {
  test("コマンドが登録されている", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes("md-to-pixiv-novel.convertFile"));
    assert.ok(commands.includes("md-to-pixiv-novel.convertSelection"));
  });
});

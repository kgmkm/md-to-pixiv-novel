"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
suite("Command Tests", () => {
    test("コマンドが登録されている", async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes("md-to-pixiv-novel.convertFile"));
        assert.ok(commands.includes("md-to-pixiv-novel.convertSelection"));
    });
});
//# sourceMappingURL=commands.test.js.map
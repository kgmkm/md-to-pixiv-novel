"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const jumpConverter_1 = require("../../../src/converters/jumpConverter");
suite("JumpConverter", () => {
    suite("convertJump", () => {
        test("[%3]を[jump:3]に変換する", () => {
            const input = "[%3]";
            const expected = "[jump:3]";
            assert.strictEqual((0, jumpConverter_1.convertJump)(input), expected);
        });
        test("文中に含まれる[%数字]も正しく変換する", () => {
            const input = "詳細は[%5]ページを参照";
            const expected = "詳細は[jump:5]ページを参照";
            assert.strictEqual((0, jumpConverter_1.convertJump)(input), expected);
        });
        test("複数のページジャンプを変換する", () => {
            const input = "[%1]と[%2]と[%10]";
            const expected = "[jump:1]と[jump:2]と[jump:10]";
            assert.strictEqual((0, jumpConverter_1.convertJump)(input), expected);
        });
        test("数字以外が含まれる場合は変換しない", () => {
            const input = "[%abc]";
            assert.strictEqual((0, jumpConverter_1.convertJump)(input), input);
        });
    });
});
//# sourceMappingURL=jump.test.js.map
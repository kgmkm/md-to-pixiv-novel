"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const imageConverter_1 = require("../../../src/converters/imageConverter");
suite("ImageConverter", () => {
    suite("convertImage", () => {
        test("![alt](12345678)を[pixivimage:12345678]に変換する", () => {
            const input = "![挿絵1](12345678)";
            const expected = "[pixivimage:12345678]";
            assert.strictEqual((0, imageConverter_1.convertImage)(input), expected);
        });
        test("alt属性なしも正しく変換する", () => {
            const input = "![](12345678)";
            const expected = "[pixivimage:12345678]";
            assert.strictEqual((0, imageConverter_1.convertImage)(input), expected);
        });
        test("複数の画像タグを変換する", () => {
            const input = "![alt1](11111111) 本文 ![alt2](22222222)";
            const expected = "[pixivimage:11111111] 本文 [pixivimage:22222222]";
            assert.strictEqual((0, imageConverter_1.convertImage)(input), expected);
        });
        test("ハイフン付きページ番号も変換する", () => {
            const input = "![手のひらにブローチ](137802828-3)";
            const expected = "[pixivimage:137802828-3]";
            assert.strictEqual((0, imageConverter_1.convertImage)(input), expected);
        });
        test("数字以外のIDは変換しない", () => {
            const input = "![alt](abc123)";
            assert.strictEqual((0, imageConverter_1.convertImage)(input), input);
        });
    });
});
//# sourceMappingURL=image.test.js.map
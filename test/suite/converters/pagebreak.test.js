"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const pagebreakConverter_1 = require("../../../src/converters/pagebreakConverter");
suite("PagebreakConverter", () => {
    suite("convertPagebreak", () => {
        test("===を[newpage]に変換する", () => {
            const input = "===";
            const expected = "[newpage]";
            assert.strictEqual((0, pagebreakConverter_1.convertPagebreak)(input), expected);
        });
        test("4つ以上の等号も[newpage]に変換する", () => {
            const input = "====";
            const expected = "[newpage]";
            assert.strictEqual((0, pagebreakConverter_1.convertPagebreak)(input), expected);
        });
        test("2つ以下の等号は変換しない", () => {
            const input = "==";
            assert.strictEqual((0, pagebreakConverter_1.convertPagebreak)(input), input);
        });
        test("行の途中にある===は変換しない", () => {
            const input = "これは===です";
            assert.strictEqual((0, pagebreakConverter_1.convertPagebreak)(input), input);
        });
        test("複数行にわたる改ページを変換する", () => {
            const input = "第一章\n===\n第二章";
            const expected = "第一章\n[newpage]\n第二章";
            assert.strictEqual((0, pagebreakConverter_1.convertPagebreak)(input), expected);
        });
    });
});
//# sourceMappingURL=pagebreak.test.js.map
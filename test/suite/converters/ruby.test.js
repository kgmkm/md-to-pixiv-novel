"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const rubyConverter_1 = require("../../../src/converters/rubyConverter");
suite("RubyConverter", () => {
    suite("convertRuby", () => {
        test("{漢字|かんじ}を[[rb:漢字 > かんじ]]に変換する", () => {
            const input = "{漢字|かんじ}";
            const expected = "[[rb:漢字 > かんじ]]";
            assert.strictEqual((0, rubyConverter_1.convertRuby)(input), expected);
        });
        test("英数字へのルビも変換する", () => {
            const input = "{pixiv|ピクシブ}";
            const expected = "[[rb:pixiv > ピクシブ]]";
            assert.strictEqual((0, rubyConverter_1.convertRuby)(input), expected);
        });
        test("1行に複数のルビがある場合すべて変換する", () => {
            const input = "{漢字|かんじ}と{振り仮名|ふりがな}";
            const expected = "[[rb:漢字 > かんじ]]と[[rb:振り仮名 > ふりがな]]";
            assert.strictEqual((0, rubyConverter_1.convertRuby)(input), expected);
        });
        test("不完全なルビ記法は変換しない", () => {
            const input = "{漢字";
            assert.strictEqual((0, rubyConverter_1.convertRuby)(input), input);
        });
        test("|がない場合は変換しない", () => {
            const input = "{漢字かんじ}";
            assert.strictEqual((0, rubyConverter_1.convertRuby)(input), input);
        });
    });
});
//# sourceMappingURL=ruby.test.js.map
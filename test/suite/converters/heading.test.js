"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const headingConverter_1 = require("../../../src/converters/headingConverter");
suite("HeadingConverter", () => {
    suite("convertHeadingH2", () => {
        test("h2見出しを改ページ付き章タイトルに変換する", () => {
            const input = "## 第一章";
            const expected = "[newpage]\n[chapter:第一章]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH2)(input), expected);
        });
        test("複数のh2見出しを変換する", () => {
            const input = "## 第一章\n\n本文\n\n## 第二章";
            const expected = "[newpage]\n[chapter:第一章]\n\n本文\n\n[newpage]\n[chapter:第二章]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH2)(input), expected);
        });
        test("h1見出しは変換しない", () => {
            const input = "# タイトル";
            assert.strictEqual((0, headingConverter_1.convertHeadingH2)(input), input);
        });
        test("h3見出しは変換しない", () => {
            const input = "### 小見出し";
            assert.strictEqual((0, headingConverter_1.convertHeadingH2)(input), input);
        });
    });
    suite("convertHeadingH3ToH6", () => {
        test("h3見出しを章タイトルに変換する", () => {
            const input = "### 第一節";
            const expected = "[chapter:第一節]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), expected);
        });
        test("h4見出しを章タイトルに変換する", () => {
            const input = "#### 小見出し";
            const expected = "[chapter:小見出し]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), expected);
        });
        test("h5見出しを章タイトルに変換する", () => {
            const input = "##### 詳細";
            const expected = "[chapter:詳細]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), expected);
        });
        test("h6見出しを章タイトルに変換する", () => {
            const input = "###### 補足";
            const expected = "[chapter:補足]";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), expected);
        });
        test("h2見出しは変換しない", () => {
            const input = "## 章タイトル";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), input);
        });
        test("h7見出しは変換しない", () => {
            const input = "####### 無効";
            assert.strictEqual((0, headingConverter_1.convertHeadingH3ToH6)(input), input);
        });
    });
});
//# sourceMappingURL=heading.test.js.map
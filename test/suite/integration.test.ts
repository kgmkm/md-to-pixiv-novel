import * as assert from "assert";
import { convertAll } from "../../src/converters";

suite("Integration Tests", () => {
  test("複合的なMarkdownテキストが正しく変換される", () => {
    const input = `# タイトル（h1は変換されない）

## 第一章

これは本文です。{漢字|かんじ}にルビを振れます。

===

### 第一節

詳細は[%2]を参照してください。

![挿絵](12345678)

[リンク](https://example.com)

## 第二章

終わり。`;

    const expected = `# タイトル（h1は変換されない）

[newpage]
[chapter:第一章]

これは本文です。[[rb:漢字 > かんじ]]にルビを振れます。

[newpage]

[chapter:第一節]

詳細は[jump:2]を参照してください。

[pixivimage:12345678]

[[jumpuri:リンク > https://example.com]]

[newpage]
[chapter:第二章]

終わり。`;

    assert.strictEqual(convertAll(input), expected);
  });

  test("変換優先順位が正しい", () => {
    // 画像タグの中の数字がページジャンプに変換されないことを確認
    const input = "![挿絵](12345678)と[%1]";
    const result = convertAll(input);
    assert.ok(result.includes("[pixivimage:12345678]"));
    assert.ok(result.includes("[jump:1]"));
    // 画像IDの数字が誤って変換されていないことを確認
    assert.ok(!result.includes("[pixivimage:[jump:"));
  });
});

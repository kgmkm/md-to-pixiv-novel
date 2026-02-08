import * as assert from "assert";
import { convertLink } from "../../../src/converters/linkConverter";

suite("LinkConverter", () => {
  suite("convertLink", () => {
    test("[テキスト](https://example.com)を変換する", () => {
      const input = "[リンクテキスト](https://example.com)";
      const expected = "[[jumpuri:リンクテキスト > https://example.com]]";
      assert.strictEqual(convertLink(input), expected);
    });

    test("http://も正しく変換する", () => {
      const input = "[リンク](http://example.com)";
      const expected = "[[jumpuri:リンク > http://example.com]]";
      assert.strictEqual(convertLink(input), expected);
    });

    test("画像タグは変換しない", () => {
      const input = "![alt](12345678)";
      assert.strictEqual(convertLink(input), input);
    });

    test("複数のリンクを変換する", () => {
      const input = "[リンク1](https://a.com)と[リンク2](https://b.com)";
      const expected =
        "[[jumpuri:リンク1 > https://a.com]]と[[jumpuri:リンク2 > https://b.com]]";
      assert.strictEqual(convertLink(input), expected);
    });
  });
});

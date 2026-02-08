import * as assert from "assert";
import { convertRuby } from "../../../src/converters/rubyConverter";

suite("RubyConverter", () => {
  suite("convertRuby", () => {
    test("{漢字|かんじ}を[[rb:漢字 > かんじ]]に変換する", () => {
      const input = "{漢字|かんじ}";
      const expected = "[[rb:漢字 > かんじ]]";
      assert.strictEqual(convertRuby(input), expected);
    });

    test("英数字へのルビも変換する", () => {
      const input = "{pixiv|ピクシブ}";
      const expected = "[[rb:pixiv > ピクシブ]]";
      assert.strictEqual(convertRuby(input), expected);
    });

    test("1行に複数のルビがある場合すべて変換する", () => {
      const input = "{漢字|かんじ}と{振り仮名|ふりがな}";
      const expected = "[[rb:漢字 > かんじ]]と[[rb:振り仮名 > ふりがな]]";
      assert.strictEqual(convertRuby(input), expected);
    });

    test("不完全なルビ記法は変換しない", () => {
      const input = "{漢字";
      assert.strictEqual(convertRuby(input), input);
    });

    test("|がない場合は変換しない", () => {
      const input = "{漢字かんじ}";
      assert.strictEqual(convertRuby(input), input);
    });

    test("熟語ルビを個別のルビに分割して変換する", () => {
      const input = "{電子出版|でん|し|しゅっ|ぱん}";
      const expected = "[[rb:電 > でん]][[rb:子 > し]][[rb:出 > しゅっ]][[rb:版 > ぱん]]";
      assert.strictEqual(convertRuby(input), expected);
    });

    test("親文字とルビの数が一致しない場合はグループルビになる", () => {
      const input = "{漢字|かん|じ}";
      const expected = "[[rb:漢字 > かんじ]]";
      assert.strictEqual(convertRuby(input), expected);
    });

    test("熟語ルビと単一ルビが混在する場合も変換する", () => {
      const input = "{電子出版|でん|し|しゅっ|ぱん}を手軽に{漢字|かんじ}";
      const expected = "[[rb:電 > でん]][[rb:子 > し]][[rb:出 > しゅっ]][[rb:版 > ぱん]]を手軽に[[rb:漢字 > かんじ]]";
      assert.strictEqual(convertRuby(input), expected);
    });
  });
});

  });
});

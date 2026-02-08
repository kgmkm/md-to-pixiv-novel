import { convertHeadingH2, convertHeadingH3ToH6 } from "./headingConverter";
import { convertPagebreak } from "./pagebreakConverter";
import { convertImage } from "./imageConverter";
import { convertJump } from "./jumpConverter";
import { convertLink } from "./linkConverter";
import { convertRuby } from "./rubyConverter";

/**
 * 変換パイプライン
 * 優先順位に従って各コンバーターを順次適用
 */
export function convertAll(text: string): string {
  let result = text;

  // 1. 改ページ（独立した行として先に処理）
  result = convertPagebreak(result);

  // 2. 見出しh2（改ページ＋章タイトル）
  result = convertHeadingH2(result);

  // 3. 見出しh3-h6（章タイトル）
  result = convertHeadingH3ToH6(result);

  // 4. 挿絵（リンク変換より先に画像を処理）
  result = convertImage(result);

  // 5. ページジャンプ（通常リンクとの区別）
  result = convertJump(result);

  // 6. URLリンク（残りのリンク形式を処理）
  result = convertLink(result);

  // 7. ルビ（インライン要素として最後に処理）
  result = convertRuby(result);

  return result;
}

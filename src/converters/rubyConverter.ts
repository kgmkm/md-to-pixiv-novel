/**
 * {親文字|ルビ}をpixivルビタグに変換
 * 熟語ルビ対応: {電子出版|でん|し|しゅっ|ぱん} → 個別のルビに分割
 */
export function convertRuby(text: string): string {
  // 熟語ルビ（|が2つ以上ある）を処理
  // マッチ全体をキャプチャして、後で解析する
  const multiRubyPattern =
    /\{([^\|\}]+)\|([^\|\}]+)\|([^\|\}]+)(?:\|([^\|\}]+))*\}/g;

  text = text.replace(multiRubyPattern, (match) => {
    // マッチした文字列を分割して解析
    const content = match.substring(1, match.length - 1); // { と } を除外
    const parts = content.split("|");

    // 少なくとも3つのパーツが必要（親文字 + ルビ1 + ルビ2）
    if (parts.length < 3) {
      return match; // 熟語ルビとして処理しない
    }

    const parent = parts[0];
    const rubies = parts.slice(1).filter((r) => r);
    const parentChars = parent.split("");

    // 親文字とルビの数が一致する場合、熟語ルビとして変換
    if (parentChars.length === rubies.length) {
      return parentChars
        .map((char: string, i: number) => `[[rb:${char} > ${rubies[i]}]]`)
        .join("");
    }

    // 一致しない場合、そのまま返す（単一ルビとして処理）
    return match;
  });

  // 単一ルビ（まだ変換されていないもの）
  // 熟語ルビの結果は [[rb:...]] なのでマッチしない
  const singleRubyPattern = /\{([^\|]+)\|([^\}]+)\}/g;
  text = text.replace(singleRubyPattern, "[[rb:$1 > $2]]");

  return text;
}

/**
 * {親文字|ルビ}をpixivルビタグに変換
 * 熟語ルビ対応: {電子出版|でん|し|しゅっ|ぱん} → 個別のルビに分割
 */
export function convertRuby(text: string): string {
  // まず熟語ルビ（複数の|を含む）を処理
  const multiRubyPattern = /\{([^\|]+)((?:\|[^\|]+)+)\}/g;

  text = text.replace(multiRubyPattern, (match, parent, rubyPart) => {
    const rubies = rubyPart.substring(1).split("|");
    const parentChars = parent.split("");

    // 親文字とルビの数が一致する場合、熟語ルビとして変換
    if (parentChars.length === rubies.length) {
      return parentChars
        .map((char: string, i: number) => `[[rb:${char} > ${rubies[i]}]]`)
        .join("");
    }

    // 一致しない場合、最初のルビだけを適用（グループルビ）
    return `[[rb:${parent} > ${rubies.join("")}]]`;
  });

  // 単一ルビ（既存の機能）も対応
  const singleRubyPattern = /\{([^\|]+)\|([^\}]+)\}/g;
  text = text.replace(singleRubyPattern, "[[rb:$1 > $2]]");

  return text;
}

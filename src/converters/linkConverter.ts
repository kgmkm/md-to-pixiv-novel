/**
 * MarkdownリンクをpixivのURLリンクタグに変換
 * 画像タグとページジャンプは除外
 */
export function convertLink(text: string): string {
  const pattern = /(?<!!)\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  return text.replace(pattern, "[[jumpuri:$1 > $2]]");
}

/**
 * Markdown画像タグをpixiv挿絵タグに変換
 */
export function convertImage(text: string): string {
  const pattern = /!\[.*?\]\(([\d-]+)\)/g;
  return text.replace(pattern, "[pixivimage:$1]");
}

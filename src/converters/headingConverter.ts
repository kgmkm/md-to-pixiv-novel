/**
 * h2見出しを改ページ付き章タイトルに変換
 */
export function convertHeadingH2(text: string): string {
  const pattern = /^##\s+(.+)$/gm;
  return text.replace(pattern, "[newpage]\n[chapter:$1]");
}

/**
 * h3-h6見出しを章タイトルに変換
 */
export function convertHeadingH3ToH6(text: string): string {
  const pattern = /^#{3,6}\s+(.+)$/gm;
  return text.replace(pattern, "[chapter:$1]");
}

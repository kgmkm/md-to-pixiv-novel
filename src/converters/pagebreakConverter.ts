/**
 * ===（3つ以上）を改ページに変換
 */
export function convertPagebreak(text: string): string {
  const pattern = /^={3,}$/gm;
  return text.replace(pattern, "[newpage]");
}

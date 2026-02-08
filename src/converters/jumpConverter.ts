/**
 * [%数字]をページジャンプタグに変換
 */
export function convertJump(text: string): string {
  const pattern = /\[%(\d+)\]/g;
  return text.replace(pattern, "[jump:$1]");
}

/**
 * コンバーター関数の型定義
 */
export type ConverterFunction = (text: string) => string;

/**
 * コンバーター設定
 */
export interface ConverterConfig {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
  priority: number;
}

/**
 * 変換結果
 */
export interface ConversionResult {
  success: boolean;
  text: string;
  changesCount: number;
}

# Markdown to pixiv Novel

Markdown形式で執筆された小説テキストを、pixiv小説で使用される特殊タグ形式に変換するVSCode拡張機能です。

## 機能

この拡張機能は、以下の2つのコマンドを提供します：

1. **Markdown → pixiv小説: ファイル全体を変換** - アクティブなエディタのファイル内容全体を変換
2. **Markdown → pixiv小説: 選択範囲を変換** - 選択したテキスト範囲のみを変換

コマンドパレット（Cmd/Ctrl+Shift+P）またはエディタの右クリックメニューから実行できます。

## 変換ルール

| Markdown記法                  | pixiv小説タグ                    |
| ----------------------------- | -------------------------------- |
| `## 見出し`                   | `[newpage]` + `[chapter:見出し]` |
| `### 見出し`〜`###### 見出し` | `[chapter:見出し]`               |
| `===`（3つ以上）              | `[newpage]`                      |
| `![alt](イラストID)`          | `[pixivimage:イラストID]`        |
| `[%ページ番号]`               | `[jump:ページ番号]`              |
| `[テキスト](URL)`             | `[[jumpuri:テキスト > URL]]`     |
| `{親文字\|ルビ}`              | `[[rb:親文字 > ルビ]]`           |
| `{熟語\|ルビ\|ルビ}` | 個別のルビに分割変換 |

## でんでんマークダウンとの互換性

この拡張機能は「でんでんマークダウン」の記法に準拠しています：

- **単一ルビ**: `{親文字|ルビ}`
- **熟語ルビ**: `{親文字|ルビ1|ルビ2|...}` （親文字とルビの数が一致する場合、個別に分割して変換）
  - 例: `{電子出版|でん|し|しゅっ|ぱん}` → `[[rb:電 > でん]][[rb:子 > し]][[rb:出 > しゅっ]][[rb:版 > ぱん]]`
- 改ページ: `===`（3つ以上の等号）

## 必要条件

- VSCode 1.74.0以上
  当方の環境では、Antigravity1.16.5でも対応しております。

## インストール

1. VSCodeを開く
2. 拡張機能パネルを開く（Cmd/Ctrl+Shift+X）
3. 「Markdown to pixiv Novel」を検索
4. 「インストール」をクリック

## 使い方

### ファイル全体を変換

1. Markdownファイルを開く
2. コマンドパレットを開く（Cmd/Ctrl+Shift+P）
3. 「Markdown → pixiv小説: ファイル全体を変換」を選択

### 選択範囲を変換

1. 変換したいテキストを選択
2. コマンドパレットを開く（Cmd/Ctrl+Shift+P）
3. 「Markdown → pixiv小説: 選択範囲を変換」を選択

または、選択したテキスト上で右クリックし、「Markdown → pixiv小説: 選択範囲を変換」を選択します。

## 変換例

### 入力（Markdown）

```markdown
# 小説タイトル

## 第一章

{漢字|かんじ}にルビを振ることができます。

===

### 第一節

詳細は[%2]ページを参照。

![挿絵](12345678)

[外部リンク](https://example.com)
```

### 出力（pixiv小説タグ）

```
# 小説タイトル

[newpage]
[chapter:第一章]

[[rb:漢字 > かんじ]]にルビを振ることができます。

[newpage]

[chapter:第一節]

詳細は[jump:2]ページを参照。

[pixivimage:12345678]

[[jumpuri:外部リンク > https://example.com]]
```

## 参考リンク

- [pixiv小説 特殊タグ一覧](https://www.pixiv.help/hc/ja/articles/235584168)
- [でんでんマークダウン仕様](https://conv.denshochan.com/markdown)

## 利用例

[【小説版】私が遣い魔に堕ちた理由 - pixiv小説タグ変換vscode拡張ショーケース](https://www.pixiv.net/novel/bookmark_detail.php?id=27232387)


## ライセンス

WTFPL (Do What The Fuck You Want To Public License)

## リポジトリ

[GitHub: kgmkm/md-to-pixiv-novel](https://github.com/kgmkm/md-to-pixiv-novel)

# リリース手順

## 前提条件

- GitHubアカウントへのアクセス権限
- リポジトリへのpush権限

## 手動リリース手順

### 1. バージョンの更新

```bash
# package.jsonのversionを更新
npm version patch  # パッチバージョンを上げる
# または
npm version minor  # マイナーバージョンを上げる
# または
npm version major  # メジャーバージョンを上げる
```

### 2. VSIXパッケージのビルド

```bash
npm run package
```

これにより `release/` ディレクトリにVSIXファイルが生成されます。

### 3. 変更をコミットしてプッシュ

```bash
git add .
git commit -m "chore: bump version to x.x.x"
git push origin main
```

### 4. Gitタグの作成とプッシュ

```bash
# package.jsonのバージョンと一致するタグを作成
VERSION=$(node -p "require('./package.json').version")
git tag -a "v${VERSION}" -m "Release v${VERSION}"
git push origin "v${VERSION}"
```

または、提供されたスクリプトを使用：

```bash
./scripts/create-release.sh
```

### 5. GitHub Releaseの作成

1. https://github.com/kgmkm/md-to-pixiv-novel/releases にアクセス
2. 「Draft a new release」をクリック
3. 「Choose a tag」で作成したタグ（例：`v1.0.5`）を選択
4. リリースタイトルを入力（例：`v1.0.5`）
5. リリースノートを記述（CHANGELOG.mdから抜粋）
6. `release/md-to-pixiv-novel-x.x.x.vsix` ファイルをアップロード
7. 「Publish release」をクリック

## トラブルシューティング

### 「タグがない」というエラー

タグが作成されていない場合：

```bash
# 現在のバージョンを確認
VERSION=$(node -p "require('./package.json').version")

# タグを作成
git tag -a "v${VERSION}" -m "Release v${VERSION}"

# タグをプッシュ
git push origin "v${VERSION}"
```

### 既存のタグを削除して再作成

```bash
# ローカルのタグを削除
git tag -d v1.0.5

# リモートのタグを削除
git push origin :refs/tags/v1.0.5

# 新しいタグを作成
git tag -a v1.0.5 -m "Release v1.0.5"

# タグをプッシュ
git push origin v1.0.5
```

## 自動化（将来の改善案）

GitHub Actionsを使用して、タグがプッシュされた時に自動的にリリースを作成することができます。

`.github/workflows/release.yml` を作成：

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Package extension
        run: npm run package
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: release/*.vsix
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

この設定により、`v*` タグがプッシュされると自動的にリリースが作成されます。

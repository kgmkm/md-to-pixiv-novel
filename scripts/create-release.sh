#!/bin/bash
set -e

# package.jsonからバージョンを取得
VERSION=$(node -p "require('./package.json').version")
TAG="v${VERSION}"

echo "Creating release for version ${TAG}..."

# タグが既に存在するか確認
if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo "Tag ${TAG} already exists"
else
    # タグを作成
    git tag -a "$TAG" -m "Release ${TAG}"
    echo "Created tag ${TAG}"
fi

# タグをプッシュ
git push origin "$TAG"
echo "Pushed tag ${TAG} to origin"

echo "✅ Tag ${TAG} has been created and pushed!"
echo "Now create a GitHub Release at: https://github.com/kgmkm/md-to-pixiv-novel/releases/new?tag=${TAG}"

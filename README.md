# MiL;C Translate

自然文と MiL;C を相互変換する軽量なWebアプリです。PWAとしてインストールでき、変換はブラウザ内だけで動きます。

## 特徴

- 自然文 → MiL;C / MiL;C → 日本語
- `sym > logic > abbr > alias` を意識した密な表現
- 「トークン寄り」と「最小バイト寄り」の2種類
- URL・メンション・未知語をなるべく保持
- alias の自動利用と既存 alias の展開
- 共有リンク
- オフライン動作するPWA
- 外部API・APIキー不要

MiL;C は固定された形式言語ではないため、この実装は実例に寄せた一つの方言です。意味を推測して補完するより、分からない情報を残すことを優先しています。

元のアイデア: [@AM09_21 の MiL;C 投稿](https://x.com/AM09_21/status/2103233036817170460)（投稿内表記: CC0 1.0）

## ローカル確認

Node.js 20 以上を使います。ランタイム依存はありません。

```bash
npm ci
npm test
npm run check
npm run build
python3 -m http.server 8000
```

`http://localhost:8000` を開けば確認できます。

## CI / 公開

- `CI`: push / pull request ごとにテスト、構文・静的チェック、ビルド
- `Pages`: `main` 更新時に同じ検証を通して `dist/` を GitHub Pages へデプロイ

初回だけ GitHub の **Settings → Pages → Source** を **GitHub Actions** に設定する必要があります。

## 構成

```text
src/milc.js       変換ロジック
src/app.js        UIと共有・PWA処理
tests/            Node標準テスト
scripts/          静的チェックとビルド
.github/workflows CI / Pages
```

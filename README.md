# Weather Cache API

OpenWeatherMap APIから天気情報を取得し、PostgreSQLにキャッシュするREST APIです。

## 技術スタック

- Express + TypeScript
- PostgreSQL（キャッシュ用）
- Docker Compose

## セットアップ

### 1. 環境変数の設定

```bash
cp .env.example .env
```

`.env` ファイルを編集し、`OPENWEATHER_API_KEY` に OpenWeatherMap の API キーを設定してください。

API キーは [OpenWeatherMap](https://openweathermap.org/api) から取得できます。

### 2. Docker Compose で起動

```bash
docker compose up
```

アプリケーションが `http://localhost:3000` で起動します。

### ローカル開発（Docker なし）

```bash
npm install
npm run dev
```

※ PostgreSQL が別途必要です。`.env` で接続先を設定してください。

## API

### GET /weather

天気情報を取得します。

**パラメータ:**
- `city` (必須): 都市名（英語）

**例:**
```bash
curl "http://localhost:3000/weather?city=Tokyo"
```

**レスポンス:**
```json
{
  "city": "Tokyo",
  "temperature": 20.5,
  "feelsLike": 19.8,
  "humidity": 65,
  "description": "clear sky",
  "windSpeed": 3.5,
  "icon": "01d"
}
```

**キャッシュ:** 同じ都市への問い合わせが1時間以内の場合、DBに保存済みのデータを返します。

## テスト

```bash
npm test
```

ユニットテストと結合テストが実行されます。外部APIの呼び出しはモックされています。

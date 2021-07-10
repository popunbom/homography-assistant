# 開発について

## Requirements

- Python 3.7
- Node.js v14
  - TypeScript
  - Svelte

## ディレクトリ構造

```
$ tree -L 2
.
├── frontend                  # 対応点選択やエクスポートを行う Web フロントエンドアプリケーション (Svelte, Node.js)
├── backend                   # 射影変換処理を行うバックエンドアプリケーション (Python)
├── docs                      # 各種ドキュメントが格納されているディレクトリ
├── docker-compose.yaml       # Docker の開発・実行環境用コンテナ
└── workspace.code-workspace  # VSCode 用の Workspace ファイル
```

## フロントエンドアプリケーション

```
$ tree -L 2
.
├── frontend
│   ├── bin                       # アプリケーション実行時のスクリプトを格納
│   ├── node_modules              
│   ├── public
│   ├── types
│   ├── src 
│   │   ├── App.svelte            # Svelte アプリケーションのエントリーコンポーネント
│   │   ├── App.test.ts
│   │   ├── components            # Svelte コンポーネントを格納
│   │   ├── entities              # フロントエンドで利用している各種エンティティの定義を格納
│   │   ├── index.ts              # フロントエンドアプリケーションのエントリーポイント
│   │   ├── stores.ts             # Svelte のデータストア
│   │   ├── stylesheets
│   │   └── utils                 # その他のユーティリティ用ソースコード
│   ├── package.json
│   ├── yarn.lock
│   ├── tsconfig.json
│   ├── snowpack.config.mjs       # バンドラーとして利用している Snowpack の config ファイル
│   ├── web-test-runner.config.js
│   └── README.md

10 directories, 16 files
```
- Svelte で書かれています
- 画像表示と対応点選択で利用している HTML5 Canvas ではライブラリとして Konva.js を利用しています
- 対応点出力のコードハイライトには CodeMirror を利用しています

## バックエンドアプリケーション
```
$ tree -L 2
.
├── Makefile
├── README.md
├── backend
│   ├── Pipfile            # pipenv の依存関係管理ファイル
│   ├── Pipfile.lock       # 
│   ├── app.py             # バックエンドアプリケーションのエントリーポイント
│   ├── bin                # アプリケーション実行時のスクリプトを格納
│   ├── lib                # 各種ライブラリ
│   │   ├── __init__.py    # 
│   │   ├── __pycache__    # 
│   │   ├── entity.py      # APIのインターフェースのエンティティ定義
│   │   ├── homography.py  # 射影変換処理の実装
│   │   └── img_util.py    # 画像データの変換処理を実装
│   └── requirements.txt   # Pipfile.lock から生成される requirements.txt
```
- Python 3.7 を利用しています
- 射影変換処理には OpenCV v4.5 を利用しています

### Pipenv のセットアップ
ローカル開発時には Pipenv による virtualenv をセットアップしてください
```bash
$ cd backend
# pipenv をインストールしていない場合
$ pip3 install pipenv
# pipenv sync：Pipfile.lock で定義されたバージョンで virtualenv をセットアップ
$ PIPENV_VENV_IN_PROJECT=true pipenv sync
```
### 依存パッケージを追加・変更・削除した場合
- 依存パッケージが変化した場合、以下のコマンドを実行して `requirements.txt` を更新してください
```bash
$ cd backend
$ pipenv lock -r > requirements.txt
```

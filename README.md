# Mr.M Coffee 

## 概要

### 目的

### 前提

| ソフトウェア   | バージョン | 備考 |
| :------------- | :--------- | :--- |
| nodejs         | 8.10.0      |      |
| docker         | 18.09.2     |      |
| docker-compose | 1.23.2      |      |
| aws-cli        | 1.16.127    |      |
| sam-cli        | 0.13.0    |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)

## 詳細

### 構築

#### 開発パッケージのセットアップ

```bash
npm install npm-run-all watch foreman cpx rimraf --save-dev
touch Procfile
```

#### 開発Webサーバーのセットアップ

```bash
npm install express ejs body-parser request --save
npm install --save-dev browser-sync connect-browser-sync nodemon sinon faker
npx browser-sync init
```

#### 開発Apiサーバーのセットアップ
 
AWS SAM CLI のインストールおよびアップデート
 
 ```bash
 pip install awscli
 pip install --user aws-sam-cli
 pip install --user --upgrade aws-sam-cli
 ```
 
 #### 開発テストのセットアップ
 E2Eテストのセットアップ
 
```bash
npm install --save-dev nightwatch webdriver-manager
./node_modules/.bin/webdriver-manager update
./node_modules/.bin/webdriver-manager update --chrome
mkdir tests/e2e
mkdir tests/e2e/logs
mkdir tests/e2e/reports
mkdir tests/e2e/screenshots
touch nightwatch.json
```
 
 E2Eテストの実行
```bash
npm run test:e2e
```

#### SBAdminの導入
 
```bash
npm install startbootstrap-sb-admin-2 --save-dev
cp -r node_modules/startbootstrap-sb-admin-2 src/resources/templates/admin
```

**[⬆ back to top](#構成)**

### 配置

#### 開発バケットのセットアップ

```bash
npm run aws:s3:create
```

#### 開発Lambdaファンクションのビルド

```bash
npm run aws:sam:build
```

#### 開発Lambdaファンクションのデプロイ

```bash
npm run aws:sam:package
npm run aws:sam:deploy
npm run aws:sam:describe
```

#### 開発Lambdaファンクションのリリース

```bash
npm run aws:sam:release:dev
```

#### データベースのセットアップ

```bash
npm install --save uuid
npm install --save-dev aws-sdk-mock
npm run db:setup
```

**[⬆ back to top](#構成)**

### 運用

#### データベースの起動と停止

```bash
npm run db:start
npm run db:show
npm run db:stop
```

#### アプリケーションの廃棄

```bash
npm run aws:sam:destroy
npm run aws:s3:destroy
npm run db:destroy
```

**[⬆ back to top](#構成)**

## 参照
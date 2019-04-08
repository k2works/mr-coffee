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
npm install express ejs --save
npm install --save-dev browser-sync connect-browser-sync
npx browser-sync init
```

#### 開発Apiサーバーのセットアップ
 
AWS SAM CLI のインストールおよびアップデート
 
 ```bash
 pip install --user aws-sam-cli
 pip install --user --upgrade aws-sam-cli
 ```
 
**[⬆ back to top](#構成)**

### 配置

**[⬆ back to top](#構成)**

### 運用

**[⬆ back to top](#構成)**

## 参照
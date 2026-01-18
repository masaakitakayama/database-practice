// .envファイルから環境変数を読み込む
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

// --- サーバー設定 ---
// シンクラウド側が割り当てる PORT 変数を最優先にする
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

// --- データベース接続設定 ---
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// --- ミドルウェア設定 ---
app.use(express.json()); // JSONを受け取れるようにする
app.use(express.static('public')); // publicフォルダ内の静的ファイルを配信

// CORS設定（フロントエンドからのアクセスを許可）
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// --- APIルート設定 ---

// 1. 接続テスト用
app.get('/test', (req, res) => {
  res.send('Node.js is working on port ' + PORT);
});

// 2. ユーザー一覧取得
app.get('/database_practice/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. 統計データ取得
app.get('/api/stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_users, 
      ROUND(AVG(age), 1) as avg_age,
      MAX(age) as max_age,
      MIN(age) as min_age
    FROM users
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('統計取得エラー:', err);
      res.status(500).json({ error: 'データ取得に失敗しました' });
      return;
    }
    res.json(results[0]);
  });
});

// 4. 特定のユーザー詳細取得（ID指定）
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('詳細取得エラー:', err);
      res.status(500).json({ error: 'サーバーエラー' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'ユーザーが見つかりません' });
      return;
    }
    res.json(results[0]);
  });
});

// --- データベース接続実行 ---
connection.connect(err => {
  if (err) {
    console.error('MySQL接続失敗: ' + err.stack);
    return;
  }
  console.log('MySQL接続成功！');
});

// 最後に1回だけ app.listen を呼び出す
// 0.0.0.0 と書くことで、外部(サーバーのプロキシ)からの接続を許可します
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});

// server.js の一番上に追記
if (!Object.hasOwn) {
  Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}
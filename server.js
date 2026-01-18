// .envファイルから環境変数を読み込む（SQLiteなら必須ではありませんが、残しておいてもOK）
require('dotenv').config();

const express = require('express');
// ★ MySQLの代わりに sqlite3 を読み込む
const sqlite3 = require('sqlite3').verbose();
const app = express();

// --- サーバー設定 ---
// Renderでは process.env.PORT が自動で割り当てられます
const PORT = process.env.PORT || 8080;

// --- データベース接続設定 (SQLite版) ---
// ★ ファイル名を指定するだけ。ファイルがなければ自動作成されます
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('SQLite接続失敗:', err.message);
    } else {
        console.log('SQLite接続成功！ (database.sqlite)');
    }
});

// --- ミドルウェア設定 ---
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// --- APIルート設定 ---

app.get('/test', (req, res) => {
    res.send('Node.js with SQLite is working on port ' + PORT);
});

// 2. ユーザー一覧取得
app.get('/database_practice/api/users', (req, res) => {
    // ★ connection.query ではなく db.all を使います
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
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
    // ★ 単一の結果を得る場合は db.get が便利です
    db.get(query, [], (err, row) => {
        if (err) {
            console.error('統計取得エラー:', err);
            res.status(500).json({ error: 'データ取得に失敗しました' });
            return;
        }
        res.json(row);
    });
});

// 4. 特定のユーザー詳細取得（ID指定）
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('詳細取得エラー:', err);
            res.status(500).json({ error: 'サーバーエラー' });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'ユーザーが見つかりません' });
            return;
        }
        res.json(row);
    });
});

// サーバー起動
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});

// Node.js 古いバージョン用互換性コード
if (!Object.hasOwn) {
    Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}
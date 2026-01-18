const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db = new sqlite3.Database('./database.sqlite');

const csvData = fs.readFileSync('data.csv', 'utf8');
const lines = csvData.trim().split('\n');

db.serialize(() => {
    // 1. テーブルの作成（MySQLの構成を再現）
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        user_name TEXT,
        email TEXT,
        created_at TEXT,
        age INTEGER,
        joined_date TEXT,
        department TEXT,
        position TEXT,
        primary_skill TEXT,
        user_name_kana TEXT,
        user_name_ruby TEXT,
        profile_image_url TEXT
    )`);

    const stmt = db.prepare(`INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    lines.forEach((line) => {
        // ダブルクォーテーションを削除し、カンマで分割
        const cleanLine = line.replace(/"/g, '');
        const cols = cleanLine.split(',');

        // "id" が "1" 以上で、かつ列数が12列ある行（ユーザーデータ）だけを処理
        if (!isNaN(cols[0]) && cols.length === 12) {
            stmt.run(cols);
        }
    });

    stmt.finalize();
    console.log("SQLiteデータベース(database.sqlite)の作成とインポートが完了しました！");
});

db.close();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log(`Error connecting to database:`, err.message);
  } else {
    console.log("Connected to SQLite Database");
  }
});

db.run(`Create table if not exists users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER NOT NULL
    )`);

module.exports = db;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log(`Error connecting to database:`, err.message);
  } else {
    console.log("Connected to SQLite Database");
  }
});
module.exports = db;

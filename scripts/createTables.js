// filepath: /Users/zanderp25/Projects/CTRL-ALT-DEFEAT/scripts/createTables.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../mydb.sqlite');

// Path to the SQL file
const sqlPath = path.resolve(__dirname, './createTables.sql');

// Read the SQL file
const sql = fs.readFileSync(sqlPath, 'utf8');

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Execute the SQL script
db.exec(sql, (err) => {
  if (err) {
    console.error('Error executing SQL script:', err.message);
  } else {
    console.log('Tables created successfully.');
  }

  // Close the database
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});
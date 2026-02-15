const sqlite3 = require('sqlite3')
const db=new sqlite3.Database('./expense.db')
db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT)`)


db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMAY KEY,
    userId INTEGER,
    title TEXT,
    amount TEXT,
    category TEXT,
    date Text)`);
    
    
});
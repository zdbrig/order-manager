import sqlite3 from 'sqlite3';
// Initialize SQLite database
const db = new sqlite3.Database('orders.db');
function listAllOrders(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}


listAllOrders().then(orders => {
    console.log('All Orders:', orders);
}).catch(console.error);
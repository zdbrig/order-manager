import sqlite3 from 'sqlite3';

// Create a new SQLite database in file
const db = new sqlite3.Database('orders.db');

// Function to initialize the database
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            clientId TEXT,
            accountId TEXT,
            market TEXT,
            side TEXT,
            price REAL,
            triggerPrice REAL,
            trailingPercent REAL,
            size REAL,
            reduceOnlySize REAL,
            remainingSize REAL,
            type TEXT,
            createdAt TEXT,
            unfillableAt TEXT,
            expiresAt TEXT,
            status TEXT,
            timeInForce TEXT,
            postOnly INTEGER,
            reduceOnly INTEGER,
            cancelReason TEXT
        )
    `);
}

// Function to save or update an order
function saveOrUpdateOrder(order: any) {
    db.run(`
        INSERT INTO orders (
            id, clientId, accountId, market, side, price, triggerPrice,
            trailingPercent, size, reduceOnlySize, remainingSize, type,
            createdAt, unfillableAt, expiresAt, status, timeInForce,
            postOnly, reduceOnly, cancelReason
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        ) ON CONFLICT(id) DO UPDATE SET
            clientId=excluded.clientId,
            accountId=excluded.accountId,
            market=excluded.market,
            side=excluded.side,
            price=excluded.price,
            triggerPrice=excluded.triggerPrice,
            trailingPercent=excluded.trailingPercent,
            size=excluded.size,
            reduceOnlySize=excluded.reduceOnlySize,
            remainingSize=excluded.remainingSize,
            type=excluded.type,
            createdAt=excluded.createdAt,
            unfillableAt=excluded.unfillableAt,
            expiresAt=excluded.expiresAt,
            status=excluded.status,
            timeInForce=excluded.timeInForce,
            postOnly=excluded.postOnly,
            reduceOnly=excluded.reduceOnly,
            cancelReason=excluded.cancelReason
    `, Object.values(order));
}

// Initialize the database
initializeDatabase();

// Example usage
// saveOrUpdateOrder(yourOrderObject);

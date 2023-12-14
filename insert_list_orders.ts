import sqlite3 from 'sqlite3';

// Initialize SQLite database
const db = new sqlite3.Database('orders.db');

// Function to Insert an Order
function insertOrder(order: any): Promise<void> {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO orders (
                id, clientId, accountId, market, side, price, triggerPrice,
                trailingPercent, size, reduceOnlySize, remainingSize, type,
                createdAt, unfillableAt, expiresAt, status, timeInForce,
                postOnly, reduceOnly, cancelReason
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(query, [
            order.id, order.clientId, order.accountId, order.market, order.side,
            order.price, order.triggerPrice, order.trailingPercent, order.size,
            order.reduceOnlySize, order.remainingSize, order.type, order.createdAt,
            order.unfillableAt, order.expiresAt, order.status, order.timeInForce,
            order.postOnly ? 1 : 0, order.reduceOnly ? 1 : 0, order.cancelReason
        ], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

// Function to List All Orders
function listAllOrders(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Example usage
insertOrder({
    "id": "7aa24eaa21b0aaeccfd3dc4c0f76196b86e7797a967b9cfe7d621cc5c0d08f5",
    "clientId": "21215963202378418",
    "accountId": "a83ef13f-730f-5f58-9266-fb3e88cb5df5",
    "market": "SOL-USD",
    "side": "SELL",
    "price": "70",
    "triggerPrice": "71.24",
    "trailingPercent": null,
    "size": "1",
    "reduceOnlySize": null,
    "remainingSize": "1",
    "type": "STOP_LIMIT",
    "createdAt": "2023-12-14T07:29:56.025Z",
    "unfillableAt": null,
    "expiresAt": "2024-01-11T07:29:55.640Z",
    "status": "UNTRIGGERED",
    "timeInForce": "FOK",
    "postOnly": false,
    "reduceOnly": false,
    "cancelReason": null
  }).then(() => {
    console.log('Order inserted successfully.');

    // After inserting, list all orders
    listAllOrders().then(orders => {
        console.log('All Orders:', orders);
    }).catch(console.error);

}).catch(console.error);

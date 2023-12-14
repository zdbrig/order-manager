import sqlite3 from 'sqlite3';



const db = new sqlite3.Database('orders.db');

// Function to check for close orders
function checkForCloseOrders(givenTriggerPrice: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const lowerBound = givenTriggerPrice * 0.99;
        const upperBound = givenTriggerPrice * 1.01;

        db.get(`
            SELECT COUNT(*) AS count FROM orders 
            WHERE ABS(triggerPrice - ?) <= (? * 0.05)
        `, [givenTriggerPrice, givenTriggerPrice], (err, row) => {
            if (err) {
                reject(err);
            } else {
                //@ts-ignore
                resolve(row.count > 0);
            }
        });
    });
}

// Example usage
checkForCloseOrders(60)
    .then(isClose => console.log(`Is there a close order? ${isClose}`))
    .catch(err => console.error(err));

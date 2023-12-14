// Define the structure of an order object
interface Order {
    id: string;
    clientId: string;
    accountId: string;
    market: string;
    side: string;
    price: string;
    triggerPrice: string;
    trailingPercent: string | null;
    size: string;
    reduceOnlySize: string | null;
    remainingSize: string;
    type: string;
    createdAt: string;
    unfillableAt: string | null;
    expiresAt: string;
    status: string;
    timeInForce: string;
    postOnly: boolean;
    reduceOnly: boolean;
    cancelReason: string | null;
}

// Function to update the orders
function updateOrders(orders: Order[]): void {
    orders.forEach(order => {
        const triggerPrice = parseFloat(order.triggerPrice);

        if (order.side === "SELL") {
            order.price = (triggerPrice * 0.95).toFixed(2); // 1% lower than the trigger price
        } else if (order.side === "BUY") {
            order.price = (triggerPrice * 1.05).toFixed(2); // 1% higher than the trigger price
        }
    });
}

// Example usage
const orders: Order[] = [
    {
      "id": "378fd077f52123a25fe1a2dbe8cd597dbc4dbcee3e4ed59af7e0b16efa052c0",
      "clientId": "38435397816783823",
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
      "createdAt": "2023-12-14T07:41:09.353Z",
      "unfillableAt": null,
      "expiresAt": "2024-01-11T07:41:08.800Z",
      "status": "UNTRIGGERED",
      "timeInForce": "FOK",
      "postOnly": false,
      "reduceOnly": false,
      "cancelReason": null
    },
    {
      "id": "7aa24eaa21b0aaeccfd3dc4c0f76196b86e7797a967b9cfe7d621cc5c0d08f5",
      "clientId": "21215963202378418",
      "accountId": "a83ef13f-730f-5f58-9266-fb3e88cb5df5",
      "market": "SOL-USD",
      "side": "BUY",
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
    }
  ]

updateOrders(orders);
console.log(orders);
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

// Function to generate buy and sell orders
function generateBuyAndSellOrders(originalOrder: Order): Order[] {
    const buyOrder: Order = { ...originalOrder, side: 'BUY' };
    const sellOrder: Order = { ...originalOrder, side: 'SELL' };

    return [buyOrder, sellOrder];
}

// Example usage
const originalOrder: Order =  {
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
  };

const newOrders = generateBuyAndSellOrders(originalOrder);
console.log(newOrders);
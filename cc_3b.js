let inventory = [
    {
        sku: "SKU-001",
        name: "Headphones",
        price: 19.99,
        stock: 100
    },
    {
        sku: "SKU-002",
        name: "Keyboard",
        price: 29.99,
        stock: 50
    },
    {
        sku: "SKU-003",
        name: "Mouse",
        price: 9.99,
        stock: 200
    },
    {
        sku: "SKU-004",
        name: "Monitor",
        price: 99.99,
        stock: 20
    }
];
inventory.push({"sku": "SKU-005", "name": "Webcam", "price": 49.99, "stock": 30});
inventory.pop();
inventory[1].price = 24.99;
inventory[0].stock += 50;
inventory[3].stock = 0; 

let orders = [
    {
        orderId: "ORDER-1001",
        items: [
            { sku: "SKU-001", qty: 2 },
            { sku: "SKU-003", qty: 1 }]
    },
    {
        orderId: "ORDER-1002",
        items: [
            { sku: "SKU-002", qty: 1 },
            { sku: "SKU-004", qty: 2 }]
    }
    ]
function processOrder(order) {
    // First check if all items are in stock
    let allItemsAvailable = true;
    let shortItem = null;
    
    order.items.forEach(item => {
        const product = inventory.find(p => p.sku === item.sku);
        if (!product) {
            allItemsAvailable = false;
            shortItem = item.sku;
        } else if (product.stock < item.qty) {
            allItemsAvailable = false;
            shortItem = item.sku;
        }
    });
    
    if (!allItemsAvailable) {
        return `Order ${order.orderId} failed: Insufficient stock for item ${shortItem}.`;
    }
    
    // All items available, decrement inventory and calculate order total
    let orderTotal = 0;
    
    order.items.forEach(item => {
        const product = inventory.find(p => p.sku === item.sku);
        product.stock -= item.qty;
        orderTotal += product.price * item.qty;
    });
    
    return `Order ${order.orderId} processed successfully. Total: $${orderTotal.toFixed(2)}`;
}

// Process all orders using forEach
console.log("Processing orders:");
orders.forEach(order => {
    const result = processOrder(order);
    console.log(result);
});

// Use reduce() to compute and log total inventory value
const totalInventoryValue = inventory.reduce((sum, product) => {
    return sum + (product.price * product.stock);
}, 0);
console.log(`\nTotal Inventory Value: $${totalInventoryValue.toFixed(2)}`);

// Use filter() to create a list of low-stock items (stock <= 20)
const lowStockItems = inventory.filter(product => product.stock <= 20);
console.log("\nLow Stock Items (stock <= 20):");
lowStockItems.forEach(item => {
    console.log(`  ${item.sku} - ${item.name}: ${item.stock} units`);
});

// Use map() to create a simple price list
const priceList = inventory.map(product => `${product.sku} — $${product.price.toFixed(2)}`);
console.log("\nPrice List:");
priceList.forEach(item => {
    console.log(`  ${item}`);
});

console.log("\nFinal Inventory:");
inventory.forEach(product => {
    console.log(`${product.sku} | ${product.name} | $${product.price.toFixed(2)} | Stock: ${product.stock}`);
});

console.log("\nOrders:");
orders.forEach(order => {
    console.log(`\n${order.orderId}:`);
    order.items.forEach(item => {
        const product = inventory.find(p => p.sku === item.sku);
        console.log(`  ${product.sku} | ${product.name} | $${product.price.toFixed(2)} | Qty: ${item.qty}`);
    });
});

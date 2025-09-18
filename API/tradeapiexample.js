// JavaScript Example: Reading Entities
// Filterable fields: client_id, symbol, commodity, position_type, contract_size, entry_price, current_price, strike_price, expiry_date, purchase_date, status, profit_loss, profit_loss_percentage
async function fetchTradeEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/68c4ad722707e9b7b8151d69/entities/Trade`, {
        headers: {
            'api_key': 'e53a541d35c94df8aca8459c55437813', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: client_id, symbol, commodity, position_type, contract_size, entry_price, current_price, strike_price, expiry_date, purchase_date, status, profit_loss, profit_loss_percentage
async function updateTradeEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/68c4ad722707e9b7b8151d69/entities/Trade/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': 'e53a541d35c94df8aca8459c55437813', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}
# Python Example: Reading Entities
# Filterable fields: client_id, symbol, commodity, position_type, contract_size, entry_price, current_price, strike_price, expiry_date, purchase_date, status, profit_loss, profit_loss_percentage
import requests

def make_api_request(api_path, method='GET', data=None):
    url = f'https://app.base44.com/api/{api_path}'
    headers = {
        'api_key': 'e53a541d35c94df8aca8459c55437813',
        'Content-Type': 'application/json'
    }
    if method.upper() == 'GET':
        response = requests.request(method, url, headers=headers, params=data)
    else:
        response = requests.request(method, url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()

entities = make_api_request(f'apps/68c4ad722707e9b7b8151d69/entities/Trade')
print(entities)

# Python Example: Updating an Entity
# Filterable fields: client_id, symbol, commodity, position_type, contract_size, entry_price, current_price, strike_price, expiry_date, purchase_date, status, profit_loss, profit_loss_percentage
def update_entity(entity_id, update_data):
    response = requests.put(
        f'https://app.base44.com/api/apps/68c4ad722707e9b7b8151d69/entities/Trade/{entity_id}',
        headers={
            'api_key': 'e53a541d35c94df8aca8459c55437813',
            'Content-Type': 'application/json'
        },
        json=update_data
    )
    response.raise_for_status()
    return response.json()
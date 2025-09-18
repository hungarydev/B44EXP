// JavaScript Example: Reading Entities
// Filterable fields: client_id, document_type, file_url, status, signed
async function fetchDocumentEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/68c4ad722707e9b7b8151d69/entities/Document`, {
        headers: {
            'api_key': 'e53a541d35c94df8aca8459c55437813', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: client_id, document_type, file_url, status, signed
async function updateDocumentEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/68c4ad722707e9b7b8151d69/entities/Document/${entityId}`, {
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
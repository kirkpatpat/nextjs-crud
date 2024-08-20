from flask import Flask, jsonify, request, abort
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# In-memory database simulation
items = []
next_id = 1

# GET /api/items: Returns a list of items
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items), 200

# POST /api/items: Creates a new item
@app.route('/api/items', methods=['POST'])
def create_item():
    global next_id
    
    # Validate incoming data
    if not request.json or 'name' not in request.json or 'price' not in request.json:
        abort(400, description="Name and price are required.")
    
    name = request.json['name']
    price = request.json['price']

    if not isinstance(name, str) or not name.strip():
        abort(400, description="Name must be a non-empty string.")
    
    if not isinstance(price, (int, float)) or price <= 0:
        abort(400, description="Price must be a positive number.")

    # Create the item
    item = {
        'id': next_id,
        'name': name,
        'description': request.json.get('description', ""),
        'price': price
    }
    items.append(item)
    next_id += 1
    return jsonify(item), 201

# GET /api/items/<id>: Returns the details of a specific item by ID
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item['id'] == item_id), None)
    if item is None:
        abort(404, description="Item not found.")
    return jsonify(item), 200

# PUT /api/items/<id>: Updates an existing item by ID
@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = next((item for item in items if item['id'] == item_id), None)
    if item is None:
        abort(404, description="Item not found.")
    
    if not request.json:
        abort(400, description="Request body must be JSON.")

    name = request.json.get('name', item['name'])
    price = request.json.get('price', item['price'])
    
    if 'name' in request.json and (not isinstance(name, str) or not name.strip()):
        abort(400, description="Name must be a non-empty string.")
    
    if 'price' in request.json and (not isinstance(price, (int, float)) or price <= 0):
        abort(400, description="Price must be a positive number.")

    # Update the item
    item['name'] = name
    item['description'] = request.json.get('description', item['description'])
    item['price'] = price
    return jsonify(item), 200

# DELETE /api/items/<id>: Deletes an item by ID
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item['id'] != item_id]
    return jsonify({'result': True}), 204

if __name__ == '__main__':
    app.run(debug=True)

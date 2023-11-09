# This will be the backend for my todo app
# database will be mongodb atlas
# backend will be python with Flask
# front end will be made with html/css and React

import requests
import config
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

print("test")

app = Flask(__name__)

# to use code http://localhost:5000/patient/123

# Create a new client and connect to the server
uri = config.DB_URI
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[config.DB_NAME]
collection = db[config.COLLECTION_NAME]

@app.route('/task/<task_id>', methods=['GET'])
def get_task(task_id):
    # Send a ping to confirm a successful connection
    return "hi"


@app.route('/task/<task_id>', methods=['POST'])
def add_task(task_id):
    
    if request.is_json:
        data = request.get_json()
        result = collection.insert_one(data)

        '''

        # Convert the ObjectId to a string to make it JSON serializable
        inserted_id = str(result.inserted_id)

        # Exclude the _id field from the returned JSON
        data.pop('_id', None)
        '''

        return jsonify({"message": "Document inserted", "data": str(data)})
    else:
        return "false"



if __name__ == '__main__':
    app.run(debug=True)

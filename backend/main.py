# This will be the backend for my todo app
# database will be mongodb atlas
# backend will be python with Flask
# front end will be made with html/css and React

import requests
import config
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS, cross_origin
import json

# corss will allow react to communicate with it
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# to use code http://localhost:5000/patient/123

# Create a new client and connect to the server
uri = config.DB_URI
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[config.DB_NAME]
task_collection = db[config.COLLECTION_NAME]
user_collection = db[config.USER_NAME]

@app.route('/task/<task_id>', methods=['GET'])
@cross_origin()
def get_task(task_id):
    # Send a ping to confirm a successful connection
    return "hi"

@app.route('/users/user', methods=['POST'])
@cross_origin()
def add_user():
    if request.is_json:
        data = request.get_json()
        result = user_collection.insert_one(data)
        return jsonify({"message": "Document inserted", "data": str(data)})
    else:
        return jsonify({"message": "Document failed to insert"})
    

        


@app.route('/tasks/task', methods=['POST'])
@cross_origin()
def add_task():
    if request.is_json:
        data = request.get_json()
        result = task_collection.insert_one(data)
        return jsonify({"message": "Document inserted", "data": str(data)})
    else:
        return jsonify({"message": "Document failed to insert"})



if __name__ == '__main__':
    app.run(debug=True)

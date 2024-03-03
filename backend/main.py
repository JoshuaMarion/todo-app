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
import bcrypt

# corss will allow react to communicate with it
app = Flask(__name__)
# cors = CORS(app, supports_credentials=True)
# cors = CORS(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# to use code http://localhost:5000/patient/123

# Create a new client and connect to the server
uri = config.DB_URI
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[config.DB_NAME]
task_collection = db[config.COLLECTION_NAME]
user_collection = db[config.USER_NAME]


# For some reason I can't use cross_origin(), I have to do it manually
@app.route('/users/login', methods=['POST'])
def user_logon():
    # change later
    response = {"test": "works"}

    if request.is_json:
        data = request.get_json()
        username_or_email = data.get('usernameoremail')
        password = data.get('password')

        user_exists = user_collection.find_one(({'username': username_or_email}))
        email_exists = user_collection.find_one(({'email': username_or_email}))
        if user_exists:
            userBytes = password.encode('utf-8') 
            result = bcrypt.checkpw(userBytes, hash) 
            if result == True:
                response = jsonify({"user_exists": "def", "password": "correct"})
            else:
                response = jsonify({"user_exists": "def", "password": "wrong"})
        else:
            response = jsonify({"user_exists": "not"})

    # Set CORS headers
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "OPTIONS, POST, GET")

    return response
    '''
    if request.is_json:
        data = request.get_json()
        username_or_email = data.get('usernameoremail')
        password = data.get('password')
        
        # either email or username should match
        # whichever matches, make sure the password 
        # is right as well. 

        user_exists = user_collection.find_one(({'username': username_or_email}))
        email_exists = user_collection.find_one(({'email': username_or_email}))
        if user_exists:
            print(user_exists)
            return jsonify({"info" : user_exists}), 402
        else:
            print('hi')
            return jsonify({"info" : "not working"}), 401
    else:
        return jsonify({"info" : "didn't recffrrfreive json"}), 400
    '''




# Finish add user
# must check to make sure username/email do next exist in the db already
# if they do, send message back rejecting
# if don't, use bcrypt to hash/salt and add to db
@app.route('/users/register', methods=['POST'])
#@cross_origin()
def add_user():
    if request.is_json:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        user_exists = user_collection.find_one(({'username': username}))
        email_exists = user_collection.find_one(({'email': email}))
        if email_exists:
            # Email already exists, ask them to login
            return jsonify({"message": "Email already in use"}), 409
            print("email exists")
        elif user_exists:
            return jsonify({"message": "Username already taken"}), 409
            print("yser exists")
        else:
            # Good to store, salt first
            bytes = password.encode('utf-8') 
            salt = bcrypt.gensalt() 
            hash = bcrypt.hashpw(bytes, salt) 
            print(hash)
            data['password'] = hash
            result = user_collection.insert_one(data)
            return jsonify({"message": "Document inserted", "data": str(data)})
    else:
        return jsonify({"message": "Document failed to insert"}), 4
    

@app.route('/tasks', methods=['GET'])
#@cross_origin(origin='*')
def get_all_tasks():
    user_id = request.args.get('user_id')
    if user_id is None:
        return jsonify({"error": "User ID is required in the request parameters"}), 400
    
    items = list(task_collection.find({"user_id": user_id}))

    # changs _id which is represented as on object to a string
    # so it can be jsonified
    for item in items:
        item['_id'] = str(item['_id'])
    return jsonify(items), 200


        


@app.route('/tasks/task', methods=['POST'])
#@cross_origin()
def add_task():
    if request.is_json:
        data = request.get_json()
        result = task_collection.insert_one(data)
        print(result)
        '''
        if 1 == 2: #Conflict, don't add to db
            pass
        else:
            # Good to store, salt first
            # example password 
            bytes = password.encode('utf-8') 
            salt = bcrypt.gensalt() 
            # Hashing the password 
            hash = bcrypt.hashpw(bytes, salt) 
            print(hash)
        '''
        return jsonify({"message": "Document inserted", "data": str(data)})
    else:
        return jsonify({"message": "Document failed to insert"})



if __name__ == '__main__':
    app.run(debug=True)

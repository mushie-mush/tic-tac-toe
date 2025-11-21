from flask import Flask, request
from flask_cors import CORS
import uuid
import csv
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello from server-python!"


@app.route("/games/save", methods=['POST'])
def save():
    game_id = uuid.uuid4()
    data = request.get_json()

    with open('database.csv', 'a') as database:
        board = data.get('board', [])
        current_player = data.get('currentPlayer', '')
        csv_writer = csv.writer(database, delimiter=',')
        csv_writer.writerow([game_id, board, current_player])

    return {'game_id': game_id}

# https://flask.palletsprojects.com/en/stable/quickstart/#routing
@app.route("/games/load/<game_id>")
def load(game_id):
    # my_list = [10, 25, 5, 40, 15]
    # Find the first number greater than 20
    # first_match = next(filter(lambda x: x > 20, my_list), None)
    # print(first_match)

    # Query the database with a game ID
    with open('database.csv', 'r') as database:
        csv_reader = csv.reader(database, delimiter=',')
        result = next(filter(lambda row: row[0] == game_id, csv_reader), None)
        print(result[1])
        # return json.loads(result[1])
        return json.loads(result[1].replace("'", '"'))
        

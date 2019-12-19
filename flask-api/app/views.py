# /server/app/views.py

from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy

# User file imports
from app import create_app
from instance import config # Need to define the variables in here yourself, inside an instance.config folder
from app.errors import user_present, invalid_format, invalid_http_method


app = create_app('development')
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)


@app.route('/LVO', methods=['GET'])
def base():
    if request.method == 'GET':
        x = {'cookie': 'line'}
        return jsonify(x)


@app.route('/submit_user', methods=['POST'])
def submit_user():
    data = request.form
    try:
        if request.method == 'POST':
            # here will be defined checking if db (see above) already has the user in it. If yes, then return error
            # user_present, if not proceed to input user. Need to figure out how to transfer large amounts of data if
            # possible to server thru JSON?
            pass
        else:
            return invalid_http_method(request.method, 'POST')
    except KeyError:
        return invalid_format('name')


@app.route('/update_user_info', methods=['PUT'])
def update_user():
    if request.method == 'PUT':
        data = request.form

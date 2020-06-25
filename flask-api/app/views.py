# /server/app/views.py
import json

from flask import jsonify, request

# User file imports
from app import create_app
from instance import config  # Need to define the variables in here yourself, inside an instance.config folder
from app.errors import user_present, user_not_present, family_present, invalid_format, invalid_http_method
from database.main_db import DbHelper

import os.path

if not os.path.isfile('meta_records.json'):
    f = open("meta_records.json", "w")
    json.dump({}, f)
    f.close()

app = create_app('development')
app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URI
db_execute = DbHelper(config.SQL_HOST, config.SQL_USER, config.SQL_PASSWORD, config.SQL_DB)



with open(f'meta_records.json', 'r', newline='', encoding='utf-8') as record_file:
    record = json.load(record_file)
    if 'family_id_count' not in record:
        record['family_id_count'] = 0
    if 'people_id_count' not in record:
        record['people_id_count'] = 0

valid_tables = {'members', 'families', 'profile'}


def success_register(registered: str):
    return jsonify(
        {
            'data': {
                'success': 'True',
                'message': {
                    'message': f'{registered} was registered'
                },
                'code': 200,
            }
        }
    )


def success_update(update):
    return jsonify(
        {
            'data': {
                'success': 'True',
                'message': {
                    'message': f'{update} was updated'
                },
                'code': 200,
            }
        }
    )


@app.route('/test', methods=['GET'])
def test():
    if request.method == 'GET':
        return success_register("connection")


@app.route('/search_family', methods=['GET'])
def search_family():
    if request.method == 'GET':
        if 'name' in request.args:
            result = db_execute.get_row('families', "family_name", f"%{request.args['name']}%", fuzzy=True)
            return jsonify(result)
        else:
            return invalid_format("Name")


@app.route('/get_family', methods=['GET'])
def get_family():
    if request.method == 'GET':
        if 'name' in request.args:
            family_info = db_execute.get_row('families', "family_name", request.args['name'], fuzzy=False)
            print(family_info, type(family_info))
            if len(family_info) == 1:
                members = db_execute.get_row('members', 'family_id', family_info[0][0], fuzzy=False)
                return jsonify(members)
            return jsonify({})
        else:
            return invalid_format("Name")


@app.route('/search_user', methods=['GET'])
def search_user():
    if request.method == 'GET':
        if 'name' in request.args:
            potential_members = db_execute.get_row('people', "person_name", f"%{request.args['name']}%", fuzzy=True)
            return jsonify(potential_members)


@app.route('/get_user', methods=['GET'])
def get_user():
    if request.method == 'GET':
        if 'name' in request.args:
            profile = db_execute.get_row('profile', "person_name", request.args['name'], fuzzy=False)
            return jsonify(profile)


@app.route('/submit_family', methods=['POST'])
def submit_family():
    try:
        if request.method == 'POST':
            # here will be defined checking if db (see above) already has the user in it. If yes, then return error
            # user_present, if not proceed to input user. Need to figure out how to transfer large amounts of data if
            # possible to server thru JSON?
            if len(db_execute.get_row('families', 'family_name', request.args['name'], fuzzy=False)) != 0:
                return family_present(f"{request.args['name']}")
            new_fam_id = record['family_id_count']
            with open(f'meta_records.json', 'w', newline='', encoding='utf-8') as record_hold:
                record['family_id_count'] += 1
                json.dump(record, record_hold)
            db_execute.input_row('families', {"family_id": new_fam_id, "family_name": request.args['name']})
            return success_register(request.args['name'])
        else:
            return invalid_http_method(request.method, 'POST')
    except KeyError:
        return invalid_format('name')


@app.route('/submit_user', methods=['POST'])
def submit_user():
    try:
        if request.method == 'POST':
            # here will be defined checking if db (see above) already has the user in it. If yes, then return error
            # user_present, if not proceed to input user. Need to figure out how to transfer large amounts of data if
            # possible to server thru JSON?
            if len(db_execute.get_row('people', 'person_name', request.args['name'], fuzzy=False)) != 0:
                return user_present(f"{request.args['name']}")

            # write the new ID into meta_records, and increment
            new_person_id = record['people_id_count']
            with open(f'meta_records.json', 'w', newline='', encoding='utf-8') as record_hold:
                record['people_id_count'] += 1
                json.dump(record, record_hold)

            # Submit the new person to the db
            db_execute.input_row('people',
                                 {"person_name": request.args['name'],
                                  "person_id": new_person_id})
            return success_register(request.args['name'])
        else:
            return invalid_http_method(request.method, 'POST')
    except KeyError:
        return invalid_format('name')


@app.route('/submit_user_family_info', methods=['POST'])
def submit_user_family_info():
    """
    ASSUMES THAT PASSED INPUT IS UNIQUE -- may need more criteria to clarify
    :return: json representation of success or failure
    """
    person_info = db_execute.get_row('people', 'person_name', request.args['name'], fuzzy=False)
    if len(person_info) == 0:
        return user_not_present(f"{request.args['name']}")
    db_execute.input_row('family_info',
                         {"family_name": request.args['family'],
                          "person_id": person_info[0][1],
                          "parent_name": request.args['parent']})
    return success_register(request.args['name'])


@app.route('/submit_attr', methods=['POST'])
def submit_attribute():
    person_info = db_execute.get_row('people', 'person_name', request.args['name'], fuzzy=False)
    if len(person_info) == 0:
        return user_not_present(f"{request.args['name']}")
    db_execute.input_row('profile',
                         {"person_id": person_info[0][1],
                          "name_attr": request.args['name_attr'],
                          "attr": request.args['attr']})
    return success_register(request.args['name'])


@app.route('/update_user', methods=['PUT'])
def update_user():
    if request.method == 'PUT':
        if 'type' in request.args and 'name' in request.args:
            to_input = {}
            person_info = db_execute.get_row('people', 'person_name', request.args['name'], fuzzy=False)

            if len(person_info) == 0:
                return user_not_present(f"{request.args['name']}")
            if request.args['type'] == 'profile':
                to_input['name_attr'] = request.args['name_attr']
                db_execute.update_row_multi_criteria('profile',
                                                     ['person_id', 'attr'],
                                                     [person_info[0][1], request.args['attr']],
                                                     to_input)
                return success_update(to_input)
            elif request.args['type'] == 'family_info':
                if 'parent_name' in request.args:
                    to_input['parent_name'] = request.args['parent_name']
                if 'family_name' in request.args:
                    to_input['family_name'] = request.args['family_name']
                db_execute.update_row('family_info', "person_name", person_info[0][1], to_input)
                return success_update(to_input)
        return invalid_format('type')
    return invalid_http_method(request.method, 'PUT')

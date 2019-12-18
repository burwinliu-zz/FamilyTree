# /server/app/views.py

from flask import jsonify
from app import create_app


app = create_app('development')


@app.route('/LVO')
def base():
    x = {'cookie': 'line'}
    return jsonify(x)

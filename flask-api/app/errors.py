from flask import jsonify


def user_present(user: str):
    return jsonify(
        {
            'error': {
                'errors': {
                    'reason': 'forbidden',
                    'message': f'User {user} already present; Forbidden request'
                },
                'code': 403,
                'message': 'Forbidden request'
            }
        }
    )


def invalid_format(param: str):
    return jsonify(
        {
            'error': {
                'errors': {
                    'reason': 'invalid',
                    'message': f'Missing parameters {param}; Invalid request'
                },
                'code': 403,
                'message': 'Invalid request'
            }
        }
    )


def invalid_http_method(method: str, intended: str):
    return jsonify(
        {
            'error': {
                'errors': {
                    'reason': 'forbidden',
                    'message': f'Made invalid HTTP method call {method} when it should be {intended}; Forbidden call'
                },
                'code': 403,
                'message': 'Forbidden call'
            }
        }
    )

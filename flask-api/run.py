# Imports
from app.views import app
from instance.config import FLASK_THREADED, FLASK_PORT

if __name__ == '__main__':
    app.run(port=FLASK_PORT, threaded=FLASK_THREADED)

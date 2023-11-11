from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Example of a GET request
@app.route('/', methods=['GET'])
def index():
    return 'Hello, World!'

# Example of a POST request
@app.route('/post', methods=['POST'])
def post():
    data = request.get_json()
    return jsonify(data)


if __name__ == '__main__':

    # Run the app on all interfaces on port 8628
    app.run(debug=True, host='0.0.0.0', port='8628')

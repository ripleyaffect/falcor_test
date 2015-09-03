from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api/message')
def message():
    return jsonify(message="world")


app.run(debug=True, port=5001)
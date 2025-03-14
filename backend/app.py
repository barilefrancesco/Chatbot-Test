from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route("/generate", methods=["GET"])
def generate():
        
    response = {
        "message": "Dati ricevuti con successo",
        "data": "data"
    }
    
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

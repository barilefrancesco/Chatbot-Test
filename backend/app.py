from flask import Flask, request, Response, stream_with_context, jsonify
import time


app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    query = data.get("query", "")

    return Response(
        stream_with_context(generate_stream(query)),
        mimetype="application/json"
    )

def generate_stream(query):
    response_text = f"Certo che conosco Datapizza, è una realtà fighissima! Lascia che ti spieghi come passare i loro test tecnici: per prima cosa devi..."
    
    words = response_text.split()
    for word in words:
        yield f'{{"response": "{word}"}}\n'
        time.sleep(0.2)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

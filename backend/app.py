from flask import Flask, request, Response, stream_with_context, jsonify
import time


app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    query = data.get("query", "")

    def generate_stream():
        response_text = f"Certo che conosco Datapizza, è una realtà fighissima! Lascia che ti spieghi come passare i loro test tecnici: per prima cosa devi..."
        words = response_text.split()
        for word in words:
            yield f"data: {word}\n\n"
            time.sleep(0.2)

    return Response(generate_stream(), content_type='text/event-stream')

@app.route("/documents", methods=["GET"])
def documents():
    return jsonify({
        "documents": [
            {
                "title": "Doc 1",
                "content": "Questo è l'inizio di un paragrafo..."
            },
            {
                "title": "Doc 2",
                "content": "Questo è l'inizio di un altro paragraf o..."
            }
        ]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

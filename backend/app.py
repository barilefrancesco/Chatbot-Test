from flask import Flask, request, Response, stream_with_context, jsonify
import time
import sys
import asyncio

app = Flask(__name__)

cache = {}
lock = asyncio.Lock() # https://docs.python.org/3/library/asyncio-sync.html#asyncio.Lock

async def get_cached_response(query):
    async with lock:
        await asyncio.sleep(2)
        return cache.get(query)

async def set_cached_response(query, response):
    async with lock:
        await asyncio.sleep(2)
        cache[query] = response

@app.route("/generate", methods=["POST"])
async def generate():
    data = request.get_json()
    query = data.get("query", "")

    # print(cache)

    cached_response = await get_cached_response(query)
    if cached_response:
        return jsonify({"response": cached_response, "cached": True})

    response_text = f"Certo che conosco Datapizza, è una realtà fighissima! Lascia che ti spieghi come passare i loro test tecnici: per prima cosa devi..."
    
    await set_cached_response(query, response_text)

    def generate_stream():
        words = response_text.split()
        for word in words:
            yield f"{word} "
            sys.stdout.flush()
            time.sleep(0.2)

    return Response(
            generate_stream(),
            content_type="text/plain",
            headers={
                'Cache-Control': 'no-cache, no-transform',
                'X-Accel-Buffering': 'no',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        )

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

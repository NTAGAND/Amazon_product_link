from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import re
import os

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
CORS(app)

def extract_asin(url):
    match = re.search(r"/dp/([A-Z0-9]{10})", url)
    return match.group(1) if match else None

def get_related_products(asin):
    related_asins = [
        "B07MJL8NXR", "B09VD48CX6", "B09TKLYT2T", "B095RTT889",
        "B0DHTMMY8L", "B09KQSM1X6", "B0DC8TND9X", "B0DHTN91HC"
    ]
    return [f"https://www.amazon.com/dp/{a}" for a in related_asins]

@app.route("/api/get-links", methods=["POST"])
def get_links():
    data = request.get_json()
    asin = extract_asin(data.get("url"))
    if not asin:
        return jsonify({"error": "Invalid Amazon URL"}), 400
    return jsonify({"asin": asin, "related_links": get_related_products(asin)})

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
   app.run(host="0.0.0.0", port=10000)

from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": [
            "https://task-manager-sable.vercel.app",  # <-- THIS IS THE CRITICAL CHANGE
            "https://task-manager-sable-ten.vercel.app",
            "http://localhost:3000"

        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

@app.route("/")
def home():
    return "Backend is running!", 200

@app.route("/health")
def health():
    return {"status": "healthy"}, 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
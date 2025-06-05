from flask import Flask
from flask_cors import CORS
import os # Import os for environment variables

app = Flask(__name__)

# Configure CORS with explicit settings
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://task-manager-okq82qehv-darkspore-s-projects.vercel.app", # <-- Use your ACTUAL Vercel frontend URL here
            "http://localhost:3000"                                         # For local development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

@app.route("/")
def home():
    # Removed redundant Access-Control-Allow-Origin and Vary headers
    return "Backend is running!", 200

@app.route("/health")
def health():
    return {"status": "healthy"}, 200

if __name__ == "__main__":
    # Use os.environ.get('PORT') for Render compatibility
    port = int(os.environ.get("PORT", 5000)) # Default to 5000 for local if PORT not set
    app.run(host='0.0.0.0', port=port)
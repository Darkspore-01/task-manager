from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS with explicit settings
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://task-manager-okq82qehv-darkspore-s-projects.vercel.app"  # Replace with your actual Vercel URL
            "http://localhost:3000"                # For local development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

@app.route("/")
def home():
    return "Backend is running!", 200, {
        "Access-Control-Allow-Origin": "https://your-vercel-app.vercel.app",
        "Vary": "Origin"
    }

@app.route("/health")
def health():
    return {"status": "healthy"}, 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)  # Match Render's port






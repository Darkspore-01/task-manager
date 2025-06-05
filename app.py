from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS with explicit settings
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://vercel.com/new/darkspore-s-projects/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=task-manager-okq82qehv-darkspore-s-projects.vercel.app&projectName=task-manager&s=https%3A%2F%2Fgithub.com%2FDarkspore-01%2Ftask-manager&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=06tCprkO_mfnCrhPtxkAA",  # Replace with your actual Vercel URL
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






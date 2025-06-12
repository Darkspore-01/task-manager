from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from models import db, User, Task

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    new_user = User(username=data["username"], password=data["password"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created!"}), 201

@app.route("/login", methods=["POST"])
def login():
    user = User.query.filter_by(username=request.json["username"]).first()
    if user and user.password == request.json["password"]:
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{"id": t.id, "title": t.title} for t in tasks]), 200
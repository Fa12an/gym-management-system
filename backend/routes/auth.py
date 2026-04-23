from fastapi import APIRouter, HTTPException
from database import users_collection
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "muscle-universe-secret-key-2024")

@router.post("/api/login")
def login(login_data: dict):
    user = users_collection.find_one({"email": login_data["email"]})
    if not user or not pwd_context.verify(login_data["password"], user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode(
        {"email": user["email"], "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY
    )
    return {"token": token, "user": {"email": user["email"], "role": user["role"]}}

@router.get("/api/check-auth")
def check_auth(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = users_collection.find_one({"email": payload["email"]})
        if user:
            return {"authenticated": True, "role": user["role"]}
    except:
        pass
    raise HTTPException(status_code=401, detail="Not authenticated")

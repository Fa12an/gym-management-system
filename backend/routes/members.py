from fastapi import APIRouter, HTTPException, Depends
from database import members_collection
from datetime import datetime
from bson import ObjectId
from jose import jwt
import os

router = APIRouter()

def member_helper(member) -> dict:
    return {
        "id": str(member["_id"]),
        "name": member.get("name", ""),
        "phone": member.get("phone", ""),
        "email": member.get("email", ""),
        "plan": member.get("plan", ""),
        "start_date": member.get("start_date", ""),
        "end_date": member.get("end_date", ""),
        "status": member.get("status", "active"),
        "fee": member.get("fee", 0),
        "join_date": str(member.get("join_date", datetime.now()))
    }

def get_current_user_from_token(token: str):
    SECRET_KEY = os.getenv("SECRET_KEY", "muscle-universe-secret-key-2024")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("email")
    except:
        return None

@router.get("/api/members")
def get_all_members():
    members = []
    for member in members_collection.find():
        members.append(member_helper(member))
    return members

@router.post("/api/members")
def add_member(member_data: dict):
    result = members_collection.insert_one(member_data)
    return {"message": "Member added", "id": str(result.inserted_id)}

@router.put("/api/members/{member_id}")
def update_member(member_id: str, member_data: dict):
    members_collection.update_one({"_id": ObjectId(member_id)}, {"$set": member_data})
    return {"message": "Member updated"}

@router.delete("/api/members/{member_id}")
def delete_member(member_id: str):
    members_collection.delete_one({"_id": ObjectId(member_id)})
    return {"message": "Member deleted"}

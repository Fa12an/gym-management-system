from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import bookings_collection, members_collection, users_collection
from models import BookingRequest, Member, LoginRequest
from datetime import datetime
from bson import ObjectId
from passlib.context import CryptContext
from jose import jwt
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "muscle-universe-secret-key-2024")

def helper_doc(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }

def create_token(email: str):
    return jwt.encode({"email": email}, SECRET_KEY, algorithm="HS256")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("email")
    except:
        return None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    email = verify_token(credentials.credentials)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def require_admin(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ============ PUBLIC ROUTES ============

@router.post("/api/book-trial")
def book_trial(booking: BookingRequest):
    booking_dict = booking.dict()
    result = bookings_collection.insert_one(booking_dict)
    return {"message": "Trial booked successfully!", "id": str(result.inserted_id)}

@router.post("/api/login")
def login(login: LoginRequest):
    user = users_collection.find_one({"email": login.email})
    if not user or not pwd_context.verify(login.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user["email"])
    return {
        "token": token,
        "user": {
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user["role"]
        }
    }

@router.get("/api/check-auth")
def check_auth(user=Depends(get_current_user)):
    return {"authenticated": True, "role": user["role"]}

# ============ ADMIN ONLY ROUTES ============

@router.get("/api/admin/bookings")
def get_bookings(admin=Depends(require_admin)):
    bookings = []
    for booking in bookings_collection.find().sort("created_at", -1):
        bookings.append(helper_doc(booking))
    return bookings

@router.put("/api/admin/bookings/{booking_id}/status")
def update_booking_status(booking_id: str, status: str, admin=Depends(require_admin)):
    result = bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": status}}
    )
    return {"message": "Status updated"}

@router.delete("/api/admin/bookings/{booking_id}")
def delete_booking(booking_id: str, admin=Depends(require_admin)):
    bookings_collection.delete_one({"_id": ObjectId(booking_id)})
    return {"message": "Booking deleted"}

@router.get("/api/admin/members")
def get_members(admin=Depends(require_admin)):
    members = []
    for member in members_collection.find():
        members.append(helper_doc(member))
    return members

@router.post("/api/admin/members")
def add_member(member: Member, admin=Depends(require_admin)):
    result = members_collection.insert_one(member.dict())
    return {"message": "Member added", "id": str(result.inserted_id)}

@router.put("/api/admin/members/{member_id}")
def update_member(member_id: str, member: Member, admin=Depends(require_admin)):
    members_collection.update_one({"_id": ObjectId(member_id)}, {"$set": member.dict()})
    return {"message": "Member updated"}

@router.delete("/api/admin/members/{member_id}")
def delete_member(member_id: str, admin=Depends(require_admin)):
    members_collection.delete_one({"_id": ObjectId(member_id)})
    return {"message": "Member deleted"}

@router.get("/api/admin/stats")
def get_stats(admin=Depends(require_admin)):
    total_bookings = bookings_collection.count_documents({})
    pending_bookings = bookings_collection.count_documents({"status": "pending"})
    total_members = members_collection.count_documents({})
    active_members = members_collection.count_documents({"status": "active"})
    
    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "total_members": total_members,
        "active_members": active_members
    }

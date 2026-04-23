from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from bson import ObjectId

# Initialize FastAPI
app = FastAPI(title="Muscle Universe Gym API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "muscle-universe-secret-key-2024")

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI environment variable not set!")

client = MongoClient(MONGO_URI)
db = client["muscleuniverse"]

# Collections
bookings_collection = db["bookings"]
members_collection = db["members"]
users_collection = db["users"]

print("✅ Connected to MongoDB!")

# Create admin user if not exists
admin_email = "gymadmin@gmail.com"
if not users_collection.find_one({"email": admin_email}):
    users_collection.insert_one({
        "email": admin_email,
        "password": pwd_context.hash("gymadmin321#"),
        "role": "admin",
        "name": "Gym Admin"
    })
    print("✅ Admin user created!")

# Helper functions
def helper_doc(doc):
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }

def create_token(email: str):
    return jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY
    )

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("email")
    except:
        return None

# ============ PUBLIC ROUTES ============

@app.get("/")
def root():
    return {"message": "Muscle Universe Gym API", "status": "active"}

@app.get("/api/test")
def test():
    return {"status": "API is working!", "timestamp": str(datetime.now())}

@app.post("/api/book-trial")
def book_trial(booking: dict):
    try:
        booking["created_at"] = datetime.now()
        booking["status"] = "pending"
        result = bookings_collection.insert_one(booking)
        return {"success": True, "message": "Trial booked successfully!", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/login")
def login(login_data: dict):
    user = users_collection.find_one({"email": login_data.get("email")})
    if not user or not pwd_context.verify(login_data.get("password", ""), user["password"]):
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

@app.get("/api/check-auth")
def check_auth(token: str):
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {"authenticated": True, "role": user["role"]}

# ============ ADMIN ROUTES ============

def require_admin(token: str):
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users_collection.find_one({"email": email})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

@app.get("/api/admin/bookings")
def get_bookings(token: str):
    require_admin(token)
    bookings = []
    for booking in bookings_collection.find().sort("created_at", -1):
        bookings.append(helper_doc(booking))
    return bookings

@app.put("/api/admin/bookings/{booking_id}/status")
def update_booking_status(booking_id: str, status: str, token: str):
    require_admin(token)
    result = bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": status}}
    )
    return {"success": True, "message": "Status updated"}

@app.delete("/api/admin/bookings/{booking_id}")
def delete_booking(booking_id: str, token: str):
    require_admin(token)
    bookings_collection.delete_one({"_id": ObjectId(booking_id)})
    return {"success": True, "message": "Booking deleted"}

@app.get("/api/admin/members")
def get_members(token: str):
    require_admin(token)
    members = []
    for member in members_collection.find():
        members.append(helper_doc(member))
    return members

@app.post("/api/admin/members")
def add_member(member: dict, token: str):
    require_admin(token)
    result = members_collection.insert_one(member)
    return {"success": True, "message": "Member added", "id": str(result.inserted_id)}

@app.put("/api/admin/members/{member_id}")
def update_member(member_id: str, member: dict, token: str):
    require_admin(token)
    members_collection.update_one({"_id": ObjectId(member_id)}, {"$set": member})
    return {"success": True, "message": "Member updated"}

@app.delete("/api/admin/members/{member_id}")
def delete_member(member_id: str, token: str):
    require_admin(token)
    members_collection.delete_one({"_id": ObjectId(member_id)})
    return {"success": True, "message": "Member deleted"}

@app.get("/api/admin/stats")
def get_stats(token: str):
    require_admin(token)
    return {
        "total_bookings": bookings_collection.count_documents({}),
        "pending_bookings": bookings_collection.count_documents({"status": "pending"}),
        "total_members": members_collection.count_documents({}),
        "active_members": members_collection.count_documents({"status": "active"})
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

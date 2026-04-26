from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from bson import ObjectId
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Muscle Universe Gym API", version="2.0")

# CORS - Allow all origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://muscle-universe.onrender.com",
        "https://muscle-universe-admin.onrender.com",
        "https://gym-website-ammg.onrender.com",
        "https://gym-backend-x3v9.onrender.com",
        "*"
    ],
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

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["muscleuniverse"]

# Collections
bookings_collection = db["bookings"]
members_collection = db["members"]
users_collection = db["users"]

print("✅ Connected to MongoDB Atlas!")

# Create admin user if not exists
admin_email = "gymadmin@gmail.com"
if not users_collection.find_one({"email": admin_email}):
    users_collection.insert_one({
        "email": admin_email,
        "password": pwd_context.hash("gymadmin321#"),
        "role": "admin",
        "name": "Gym Admin",
        "created_at": datetime.now()
    })
    print("✅ Admin user created!")

# Helper Functions
def helper_doc(doc):
    """Convert MongoDB document to JSON serializable format"""
    if doc is None:
        return None
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }

def create_token(email: str):
    """Create JWT token for user"""
    return jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY
    )

def verify_token(token: str):
    """Verify JWT token and return email"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("email")
    except:
        return None

def get_current_user(token: str):
    """Get current user from token"""
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def require_admin(token: str):
    """Check if user is admin"""
    user = get_current_user(token)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ============ KEEP-ALIVE ENDPOINTS (ROOT LEVEL) ============

@app.get("/keep-alive")
def keep_alive():
    """Simple endpoint to keep the server alive - NO /api prefix"""
    return {
        "status": "alive",
        "timestamp": datetime.now().isoformat(),
        "message": "Server is running"
    }

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "database": "connected" if client is not None else "disconnected",
        "uptime": "running"
    }

@app.get("/ping")
def ping():
    """Simple ping endpoint"""
    return {
        "pong": True,
        "timestamp": datetime.now().isoformat()
    }

# ============ PUBLIC ROUTES ============

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Muscle Universe Gym API",
        "status": "active",
        "version": "2.0",
        "endpoints": [
            "/keep-alive",
            "/health",
            "/ping",
            "/api/test",
            "/api/book-trial",
            "/api/login",
            "/api/check-auth",
            "/admin/*"
        ]
    }

@app.get("/api/test")
def test():
    """Test endpoint to check if API is working"""
    return {
        "status": "API is working!",
        "timestamp": datetime.now().isoformat(),
        "message": "Muscle Universe Gym API is live"
    }

@app.post("/api/book-trial")
def book_trial(booking: dict):
    """Book a free trial"""
    try:
        # Validate required fields
        required_fields = ["name", "phone", "email", "goal", "preferred_date", "preferred_time"]
        for field in required_fields:
            if field not in booking or not booking[field]:
                raise HTTPException(status_code=400, detail=f"Missing field: {field}")
        
        # Add metadata
        booking["created_at"] = datetime.now()
        booking["status"] = "pending"
        
        # Insert into database
        result = bookings_collection.insert_one(booking)
        
        return {
            "success": True,
            "message": "Trial booked successfully! We'll contact you soon.",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        print(f"Error booking trial: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/login")
def login(login_data: dict):
    """Login for admin users"""
    try:
        email = login_data.get("email")
        password = login_data.get("password")
        
        if not email or not password:
            raise HTTPException(status_code=400, detail="Email and password required")
        
        user = users_collection.find_one({"email": email})
        if not user or not pwd_context.verify(password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_token(user["email"])
        
        return {
            "success": True,
            "token": token,
            "user": {
                "email": user["email"],
                "name": user.get("name", ""),
                "role": user["role"]
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during login: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

@app.get("/api/check-auth")
def check_auth(token: str):
    """Check if user is authenticated"""
    try:
        user = get_current_user(token)
        return {
            "authenticated": True,
            "role": user["role"],
            "email": user["email"]
        }
    except HTTPException:
        return {"authenticated": False}
    except Exception as e:
        print(f"Error checking auth: {e}")
        return {"authenticated": False}

# ============ ADMIN ROUTES ============

@app.get("/api/admin/stats")
def get_admin_stats(token: str):
    """Get dashboard statistics for admin"""
    try:
        admin_user = require_admin(token)
        
        total_bookings = bookings_collection.count_documents({})
        pending_bookings = bookings_collection.count_documents({"status": "pending"})
        confirmed_bookings = bookings_collection.count_documents({"status": "confirmed"})
        completed_bookings = bookings_collection.count_documents({"status": "completed"})
        cancelled_bookings = bookings_collection.count_documents({"status": "cancelled"})
        
        total_members = members_collection.count_documents({})
        active_members = members_collection.count_documents({"status": "active"})
        
        # Recent bookings (last 7 days)
        seven_days_ago = datetime.now() - timedelta(days=7)
        recent_bookings = bookings_collection.count_documents({
            "created_at": {"$gte": seven_days_ago}
        })
        
        return {
            "success": True,
            "stats": {
                "total_bookings": total_bookings,
                "pending_bookings": pending_bookings,
                "confirmed_bookings": confirmed_bookings,
                "completed_bookings": completed_bookings,
                "cancelled_bookings": cancelled_bookings,
                "total_members": total_members,
                "active_members": active_members,
                "recent_bookings": recent_bookings
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/bookings")
def get_all_bookings(token: str):
    """Get all trial bookings (admin only)"""
    try:
        admin_user = require_admin(token)
        
        bookings = []
        for booking in bookings_collection.find().sort("created_at", -1):
            bookings.append(helper_doc(booking))
        
        return {
            "success": True,
            "bookings": bookings,
            "count": len(bookings)
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting bookings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/bookings/pending")
def get_pending_bookings(token: str):
    """Get pending trial bookings (admin only)"""
    try:
        admin_user = require_admin(token)
        
        bookings = []
        for booking in bookings_collection.find({"status": "pending"}).sort("created_at", -1):
            bookings.append(helper_doc(booking))
        
        return {
            "success": True,
            "bookings": bookings,
            "count": len(bookings)
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting pending bookings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/admin/bookings/{booking_id}/status")
def update_booking_status(booking_id: str, status: str, token: str):
    """Update booking status (admin only)"""
    try:
        admin_user = require_admin(token)
        
        valid_statuses = ["pending", "confirmed", "completed", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = bookings_collection.update_one(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": status,
                    "updated_at": datetime.now(),
                    "updated_by": admin_user["email"]
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return {
            "success": True,
            "message": f"Booking status updated to {status}"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating booking status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/admin/bookings/{booking_id}")
def delete_booking(booking_id: str, token: str):
    """Delete a booking (admin only)"""
    try:
        admin_user = require_admin(token)
        
        result = bookings_collection.delete_one({"_id": ObjectId(booking_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return {
            "success": True,
            "message": "Booking deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting booking: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/members")
def get_all_members(token: str):
    """Get all members (admin only)"""
    try:
        admin_user = require_admin(token)
        
        members = []
        for member in members_collection.find().sort("created_at", -1):
            members.append(helper_doc(member))
        
        return {
            "success": True,
            "members": members,
            "count": len(members)
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting members: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/members")
def add_member(member: dict, token: str):
    """Add a new member (admin only)"""
    try:
        admin_user = require_admin(token)
        
        # Validate required fields
        required_fields = ["name", "phone", "email", "plan", "start_date", "end_date", "fee"]
        for field in required_fields:
            if field not in member or not member[field]:
                raise HTTPException(status_code=400, detail=f"Missing field: {field}")
        
        # Add metadata
        member["created_at"] = datetime.now()
        member["created_by"] = admin_user["email"]
        member["status"] = member.get("status", "active")
        
        # Check if member already exists
        existing = members_collection.find_one({"email": member["email"]})
        if existing:
            raise HTTPException(status_code=400, detail="Member with this email already exists")
        
        result = members_collection.insert_one(member)
        
        return {
            "success": True,
            "message": "Member added successfully",
            "id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error adding member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/admin/members/{member_id}")
def update_member(member_id: str, member: dict, token: str):
    """Update member details (admin only)"""
    try:
        admin_user = require_admin(token)
        
        # Remove id if present
        member.pop("id", None)
        
        # Add update metadata
        member["updated_at"] = datetime.now()
        member["updated_by"] = admin_user["email"]
        
        result = members_collection.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": member}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Member not found")
        
        return {
            "success": True,
            "message": "Member updated successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/admin/members/{member_id}")
def delete_member(member_id: str, token: str):
    """Delete a member (admin only)"""
    try:
        admin_user = require_admin(token)
        
        result = members_collection.delete_one({"_id": ObjectId(member_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Member not found")
        
        return {
            "success": True,
            "message": "Member deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============ ERROR HANDLERS ============

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "success": False,
        "error": exc.detail,
        "status_code": exc.status_code
    }

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    print(f"Unhandled exception: {exc}")
    return {
        "success": False,
        "error": "Internal server error",
        "status_code": 500
    }

# ============ RUN SERVER ============
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

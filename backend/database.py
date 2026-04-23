import os
from pymongo import MongoClient
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is not set!")

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Use muscleuniverse database
db = client["muscleuniverse"]

# Collections
bookings_collection = db["bookings"]
members_collection = db["members"]
users_collection = db["users"]

# Alias for compatibility with existing route files
payments_collection = db["payments"]  # This will be created if needed
leads_collection = db["leads"]  # This will be created if needed
attendance_collection = db["attendance"]  # This will be created if needed

logger.info("✅ Connected to MongoDB!")

# Create admin user if not exists
admin_email = "gymadmin@gmail.com"
if not users_collection.find_one({"email": admin_email}):
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    users_collection.insert_one({
        "email": admin_email,
        "password": pwd_context.hash("gymadmin321#"),
        "role": "admin",
        "name": "Gym Admin"
    })
    logger.info("✅ Admin user created!")

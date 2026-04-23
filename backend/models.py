from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookingRequest(BaseModel):
    name: str
    phone: str
    email: str
    goal: str
    preferred_date: str
    preferred_time: str
    created_at: datetime = datetime.now()
    status: str = "pending"  # pending, confirmed, completed, cancelled

class Member(BaseModel):
    name: str
    phone: str
    email: str
    plan: str
    start_date: str
    end_date: str
    fee: float
    status: str = "active"

class User(BaseModel):
    email: str
    password: str
    name: Optional[str] = None
    role: str = "user"

class LoginRequest(BaseModel):
    email: str
    password: str

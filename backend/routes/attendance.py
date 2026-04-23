from fastapi import APIRouter
from database import attendance_collection
from datetime import datetime

router = APIRouter()

@router.get("/api/attendance/today")
def get_today_attendance():
    today = datetime.now().strftime("%Y-%m-%d")
    attendance = []
    for record in attendance_collection.find({"date": today}):
        attendance.append({
            "member_id": str(record["_id"]),
            "date": record["date"],
            "time": str(record.get("timestamp", datetime.now()))
        })
    return {"date": today, "count": len(attendance), "members": attendance}

@router.post("/api/attendance/{member_id}")
def mark_attendance(member_id: str):
    today = datetime.now().strftime("%Y-%d-%m")
    attendance_collection.insert_one({
        "member_id": member_id,
        "date": today,
        "timestamp": datetime.now()
    })
    return {"message": "Attendance marked"}

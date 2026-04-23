from fastapi import APIRouter
from database import leads_collection
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.get("/api/leads")
def get_all_leads():
    leads = []
    for lead in leads_collection.find().sort("created_at", -1):
        leads.append({
            "id": str(lead["_id"]),
            "name": lead.get("name", ""),
            "phone": lead.get("phone", ""),
            "goal": lead.get("goal", ""),
            "created_at": str(lead.get("created_at", datetime.now()))
        })
    return leads

@router.post("/api/leads")
def add_lead(lead_data: dict):
    lead_data["created_at"] = datetime.now()
    result = leads_collection.insert_one(lead_data)
    return {"message": "Lead added", "id": str(result.inserted_id)}

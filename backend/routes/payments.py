from fastapi import APIRouter
from database import payments_collection, members_collection
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.get("/api/payments")
def get_all_payments():
    payments = []
    for payment in payments_collection.find().sort("payment_date", -1):
        payment_dict = {
            "id": str(payment["_id"]),
            "member_id": payment.get("member_id", ""),
            "amount": payment.get("amount", 0),
            "month": payment.get("month", ""),
            "status": payment.get("status", "paid"),
            "payment_date": str(payment.get("payment_date", datetime.now())),
            "payment_method": payment.get("payment_method", "cash")
        }
        # Get member name
        member = members_collection.find_one({"_id": ObjectId(payment["member_id"])}) if payment.get("member_id") else None
        payment_dict["member_name"] = member.get("name", "Unknown") if member else "Unknown"
        payments.append(payment_dict)
    return payments

@router.post("/api/payments")
def add_payment(payment_data: dict):
    payment_data["payment_date"] = datetime.now()
    payment_data["status"] = "paid"
    result = payments_collection.insert_one(payment_data)
    return {"message": "Payment recorded", "id": str(result.inserted_id)}

@router.get("/api/payments/pending")
def get_pending_payments():
    return []  # Return empty list for now

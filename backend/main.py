from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import members, leads, payments, auth, attendance
import os

app = FastAPI(title="Muscle Universe Gym API", version="1.0")

# CORS - Allow all origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://muscle-universe.onrender.com",
        "https://muscle-universe-admin.onrender.com",
        "http://localhost:3000",
        "http://localhost:3001",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes - Note the prefixes
app.include_router(members.router)
app.include_router(leads.router)
app.include_router(payments.router)
app.include_router(auth.router)
app.include_router(attendance.router)

# Also include the routes from your routes.py
from routes import router as main_router
app.include_router(main_router)

@app.get("/")
def root():
    return {"message": "Welcome to Muscle Universe Gym API", "status": "active"}

@app.get("/api/test")
def test():
    return {"status": "API is working!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

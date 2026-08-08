from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from starlette.middleware.sessions import SessionMiddleware
from app.routers.auth import router as auth_router
import os

from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
SECRET_KEY = os.getenv("SECRET_KEY")
app = FastAPI(
    title="QORA Backend",
    version="1.0.0"
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY,
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to QORA Backend 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
app.include_router(auth_router)
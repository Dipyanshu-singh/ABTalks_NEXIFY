import os

from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import RedirectResponse

router = APIRouter()

oauth = OAuth()
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

oauth.register(
    name="github",
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    access_token_url="https://github.com/login/oauth/access_token",
    authorize_url="https://github.com/login/oauth/authorize",
    api_base_url="https://api.github.com/",
    client_kwargs={
        "scope": "read:user user:email",
    },
)

@router.get("/login/github")
async def login_github(request: Request):
    redirect_uri = request.url_for("github_callback")
    print("Redirect URI:", redirect_uri)
    return await oauth.github.authorize_redirect(request, redirect_uri)

@router.get("/auth/github/callback", name="github_callback")
async def github_callback(request: Request):
    token = await oauth.github.authorize_access_token(request)

    resp = await oauth.github.get("user", token=token)
    user = resp.json()

    return RedirectResponse(url="http://localhost:5173/analytics")

    return RedirectResponse(
        url=f"http://localhost:5173/analytics?token={jwt_token}"
    )
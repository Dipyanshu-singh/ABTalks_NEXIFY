import os

from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from pathlib import Path

from app.utils.jwt import create_access_token

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

oauth = OAuth()

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
    try:
        token = await oauth.github.authorize_access_token(request)
        print("TOKEN:", token)

        resp = await oauth.github.get("user", token=token)
        print("STATUS:", resp.status_code)

        user = resp.json()
        print("USER:", user)

        jwt_token = create_access_token({
            "id": user["id"],
            "login": user["login"],
            "avatar": user["avatar_url"],
        })

        return RedirectResponse(
            url=f"https://ab-talks-nexify-d5zq.vercel.app//auth-success?token={jwt_token}"
        )

    except Exception as e:
        print("ERROR:", repr(e))
        raise
    
  
    

    return RedirectResponse(
    url=f"http://127.0.0.1:5173/auth-success?token={jwt_token}"
    )
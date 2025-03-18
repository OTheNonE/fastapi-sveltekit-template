from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from fastapi.requests import Request
from fastapi.security import OpenIdConnect
from authlib.integrations.starlette_client import OAuth
from src.modules.env_var import env

router = APIRouter()

oauth = OAuth()

oauth.register(
    name="entraid",
    server_metadata_url=env.WELLKNOWN_URL,
    client_id=env.CLIENT_ID,
    client_secret=env.CLIENT_SECRET,
    client_kwargs={
        'scope': 'openid email profile',
        'redirect_url': env.REDIRECT_URI
    }
)


@router.get("/login")
async def login(request: Request):
    return await oauth.entraid.authorize_redirect(request, env.REDIRECT_URI)

@router.get("/login/callback")
async def login_callback():
    return "login callback"

@router.get("/logout")
async def logout():
    return "logout"

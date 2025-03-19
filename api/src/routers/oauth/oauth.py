from typing import Any, TypedDict, Optional
from fastapi import APIRouter, HTTPException
from fastapi.requests import Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth, StarletteOAuth2App, OAuthError
from src.modules.env_var import env
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    roles: list[str]
    scope: str

class OAuth2Token(TypedDict):
    access_token: str
    token_type: str
    expires_in: int
    ext_expires_in: int
    refresh_token: Optional[str]
    scope: str
    id_token: str
    userinfo: dict[str, Any]

oauth = OAuth()

entra_id: StarletteOAuth2App = oauth.register(
    name="entraid",
    server_metadata_url=env.WELLKNOWN_URL,
    client_id=env.CLIENT_ID,
    client_secret=env.CLIENT_SECRET,
    client_kwargs={
        'scope': 'openid email profile offline_access',
    }
)

router = APIRouter()

@router.get("/login")
async def login(request: Request):
    return await entra_id.authorize_redirect(request, env.REDIRECT_URI)

@router.get("/login/callback")
async def login_callback(request: Request):
    try:
        token: OAuth2Token = await entra_id.authorize_access_token(request)
    except OAuthError as err:
        return "an error occured"

    user = token['userinfo']
    scope = token['scope']

    if user:
        request.session['user'] = dict(user)
        request.session['scope'] = scope

    return RedirectResponse("http://localhost:5173")

@router.get("/logout")
async def logout(request: Request):
    if request.session['user']:
        request.session.pop('user')

    return RedirectResponse('/')

@router.get("/profile", response_model=User)
def get_user(request: Request):

    user = request.session["user"]
    scope = request.session["scope"]

    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return { 
        "name": user["name"], 
        "email": user["email"],
        "roles": user["roles"],
        "scope": scope
    }
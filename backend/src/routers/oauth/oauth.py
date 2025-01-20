from fastapi import APIRouter

router = APIRouter()

@router.get("/login")
async def oauth_login():
    return "login"

@router.get("/login/callback")
async def oauth_login_callback():
    return "login callback"

@router.get("/logout")
async def oauth_logout():
    return "logout"

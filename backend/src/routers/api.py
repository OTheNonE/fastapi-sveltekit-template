from fastapi import APIRouter
from .oauth import oauth
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    user_id: int

router = APIRouter()

router.include_router(oauth.router, prefix="/oauth")

@router.get("/hello")
async def api_function():
    return { "property": "greatsss" }

@router.get("/contact", response_model=User)
async def contact():

    user = User(name="Hanus", age=8, user_id=12345678)
    return user

@router.get("/about")
async def about():
    return {
        "description": "It aint me, it is you"
    }
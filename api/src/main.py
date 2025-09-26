from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import Response
from fastapi.security import OpenIdConnect
from fastapi.middleware.cors import CORSMiddleware
from src.routers import api
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"
]

# @app.middleware("http")
# async def validate_user(request: Request, call_next):
#     response: Response = await call_next(request)
#     return response

app.include_router(api.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(SessionMiddleware, secret_key="123454r5tghynjytr54trgyhbnytr678")

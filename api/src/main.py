from fastapi import FastAPI
from src.routers import api
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="123454r5tghynjytr54trgyhbnytr678")
app.include_router(api.router, prefix="/api")

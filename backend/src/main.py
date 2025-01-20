import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.routers import api

RUN_MODE = str(sys.argv[1])

app = FastAPI()

app.include_router(api.router, prefix="/api")

if RUN_MODE == "run":
    app.mount("/", StaticFiles(directory="./frontend-build", html=True), name="SPA")
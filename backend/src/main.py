import sys
import os
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from src.routers import api

BUILD_DIR = Path(__file__).parent.parent / "build"
index_file = BUILD_DIR / "index.html"

RUN_MODE = str(sys.argv[1])

spa = StaticFiles(directory="./build", html=True)

app = FastAPI()

app.include_router(api.router, prefix="/api")

@app.get("/{full_path:path}")
async def serve_spa(request: Request, full_path: str):

    file_path = BUILD_DIR / full_path

    if file_path.exists() and file_path.is_file():
        file_to_serve = file_path
    else:
        file_to_serve = index_file

    return spa.file_response(
        file_to_serve, 
        stat_result=os.stat(file_to_serve), 
        scope=request.scope
    )

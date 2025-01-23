FROM python:3.9 AS runtime
WORKDIR /app

COPY ./requirements.txt /app/
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY src/. ./src/

EXPOSE 8000
CMD ["fastapi", "run", "src/main.py"]
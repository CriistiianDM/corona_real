FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/
COPY wait-for-db.sh /app/wait-for-db.sh

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y netcat-openbsd

COPY . /app/

WORKDIR /app/src/server/

EXPOSE 8000

RUN chmod +x /app/wait-for-db.sh

ENV DB_HOST=db
ENV DB_PORT=5432

CMD ["/app/src/server/wait-for-db.sh", "python", "manage.py", "runserver", "0.0.0.0:8000"]
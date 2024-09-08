FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

WORKDIR /app/src/server

EXPOSE 4008

CMD ["python", "manage.py", "runserver", "0.0.0.0:4800"]
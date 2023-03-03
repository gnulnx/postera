FROM python:3.10

WORKDIR  /app

# Copy Fastapi code over
COPY . .

# Install requirements
RUN pip install -r requirements.txt

# Start from entrypoint.sh (useful if there are other setup steps)
ENTRYPOINT [ "./entrypoint.sh" ]
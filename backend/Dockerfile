FROM python:3.10
RUN mkdir -p /app
COPY . /app
WORKDIR  /app
RUN pip install -r requirements.txt
ENTRYPOINT [ "./entrypoint.sh" ]
 FROM python:3.10
RUN mkdir -p /app
COPY . /app
WORKDIR  /app
RUN echo $(ls -l /home/webapp/)
RUN pip install -r requirements.txt

# CMD ["tail", "-f", "/dev/null"]
# CMD ["uvicorn", "main:app",]
ENTRYPOINT [ "./entrypoint.sh" ]
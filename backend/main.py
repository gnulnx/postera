import uvicorn

if __name__ == "__main__":
    # Use first when containerized
    # uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)
    uvicorn.run("app.api:app", host="0.0.0.0", port=8080, reload=True)

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware



# from .dependencies import get_query_token, get_token_header
# from .internal import admin
# from .routers import items, users

# app = FastAPI(dependencies=[Depends(get_query_token)])
app = FastAPI()

#Allow CORS from frontend app on port 8001
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=["http://localhost:8001"],
    allow_headers=["Access-Control-Allow-Origin"]
)

# app.include_router(users.router)
# app.include_router(items.router)
# app.include_router(
#     admin.router,
#     prefix="/admin",
#     tags=["admin"],
#     dependencies=[Depends(get_token_header)],
#     responses={418: {"description": "I'm a teapot"}},
# )


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
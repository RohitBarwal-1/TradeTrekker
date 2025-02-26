from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_indexes
from auth import router as auth_router

app = FastAPI()

# ✅ Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup_event():
    await create_indexes()

# Include authentication routes
app.include_router(auth_router, prefix="/auth")

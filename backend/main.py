import requests
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

ALPHA_VANTAGE_API_KEY = 'ESGBHGYLKCDROOBC'

@app.get("/top_gainers")
async def nse_top_gainers():
    url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return {"top_gainers": data.get("top_gainers", [])}

@app.get('/top_losers') 
async def nse_top_losers():
    url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
    response = requests.get(url)
    data = response.json()

    return {"top_losers": data.get("top_losers",[])}

@app.get("/most_active")
async def get_most_active():
    url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return {"most_active": data.get("most_actively_traded", [])}

# Include authentication routes
app.include_router(auth_router, prefix="/auth")

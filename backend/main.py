import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import create_indexes, stocks_collection
from auth import router as auth_router
from save_stock import router as stock_router


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
# url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
# url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
# url = f"https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHA_VANTAGE_API_KEY}"
FMP_API_KEY = 'InYrsWlHCP3me91tYWjyFr4sadNtUIOE'


@app.get("/top_gainers")
async def top_gainers(): 
    url = f'https://financialmodelingprep.com/stable/biggest-gainers?apikey={FMP_API_KEY}'
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch stock data")

    data = response.json()
    result = []

    for stock in data:
        ticker = stock.get("symbol")
        stock_price = stock.get("price")
        percentage_change = stock.get("changesPercentage")

        # Fetch company details from MongoDB
        company = await stocks_collection.find_one({"org_ticker": ticker})

        if company:
            company_name = company["org_name"]
            image_base64 = company.get("org_logo")  # Directly stored base64 image
        else:
            company_name = ticker  # Default to ticker if company not found
            image_base64 = None

        result.append({
            "company_name": company_name,
            "logo_base64": image_base64,
            "stock_price": stock_price,
            "percentage_change": percentage_change
        })

    return {"top_gainers": result}


@app.get('/top_losers') 
async def top_losers():
    
    url = f'https://financialmodelingprep.com/stable/biggest-losers?apikey={FMP_API_KEY}'
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch stock data")

    data = response.json()
    result = []

    for stock in data:
        ticker = stock.get("symbol")
        stock_price = stock.get("price")
        percentage_change = stock.get("changesPercentage")

        # Fetch company details from MongoDB
        company = await stocks_collection.find_one({"org_ticker": ticker})

        if company:
            company_name = company["org_name"]
            image_base64 = company.get("org_logo")  # Directly stored base64 image
        else:
            company_name = ticker  # Default to ticker if company not found
            image_base64 = None

        result.append({
            "company_name": company_name,
            "logo_base64": image_base64,
            "stock_price": stock_price,
            "percentage_change": percentage_change
        })

    return {"top_losers": result}

@app.get("/most_active")
async def get_most_active():
    url = f'https://financialmodelingprep.com/api/v3/stock_market/actives?apikey={FMP_API_KEY}'
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch stock data")

    data = response.json()
    result = []

    for stock in data:
        ticker = stock.get("symbol")
        stock_price = stock.get("price")
        percentage_change = stock.get("changesPercentage")

        # Fetch company details from MongoDB
        company = await stocks_collection.find_one({"org_ticker": ticker})

        if company:
            company_name = company["org_name"]
            image_base64 = company.get("org_logo")  # Directly stored base64 image
        else:
            company_name = ticker  # Default to ticker if company not found
            image_base64 = None

        result.append({
            "company_name": company_name,
            "logo_base64": image_base64,
            "stock_price": stock_price,
            "percentage_change": percentage_change
        })

    return {"most_active": result}

# Include authentication routes
app.include_router(auth_router, prefix="/auth")
app.include_router(stock_router)

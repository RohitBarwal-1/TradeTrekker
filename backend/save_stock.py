import base64
from fastapi  import APIRouter
from database import stocks_collection
from fastapi import APIRouter, UploadFile, File, Form

router = APIRouter()

@router.post("/save_stock")
async def save_stock( org_name: str = Form(...), org_ticker: str = Form(...), file: UploadFile = File(...) ):
    print("Request received")

    # Read file content asynchronously
    file_data = await file.read()
    base64_image = base64.b64encode(file_data).decode("utf-8")

    # Save stock data in MongoDB
    stock_data = {
        "org_name": org_name,
        "org_ticker": org_ticker,
        "org_logo": base64_image,  # Store Base64 string
    }
    await stocks_collection.insert_one(stock_data)

    print("Stock saved successfully!")
    return {"message": "Stock info saved successfully!"}

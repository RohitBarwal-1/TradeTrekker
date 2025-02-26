from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from database import users_collection
from utils import hash_password,verify_password, create_access_token
from models import UserCreate

router = APIRouter()

@router.post("/register")
async def register_user(request: Request,user: UserCreate):
    raw_data = await request.json()
    print("Raw Request JSON:", raw_data)
    try:
        # Hash password before storing
        print("Received User Data:", user.dict())
        hashed_pwd = hash_password(user.password)
        new_user = {
            "username": user.username,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "contact": user.contact,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
            "hashed_password": hashed_pwd
        }

        # Insert into MongoDB
        await users_collection.insert_one(new_user)
        return {"message": "User registered successfully!"}

    except Exception as e:
        if "duplicate key error" in str(e):
            raise HTTPException(status_code=400, detail="Username already exists")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/login")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    # Find user in MongoDB by username
    user = await users_collection.find_one({"username": form_data.username})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Verify password
    if not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Generate JWT token
    access_token = create_access_token(
        data={"sub": user["username"]}, 
        expires_delta=timedelta(minutes=30)
    )

    return {"access_token": access_token, "token_type": "bearer"}

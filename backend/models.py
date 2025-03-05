from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    fname: str
    lname: str
    email: EmailStr  
    contact: str
    is_staff: bool
    is_active: bool
    password: str

class Stock(BaseModel):
    org_name: str
    org_ticker: str
    org_logo: Optional[str]  # ObjectId of the stored image in GridFS

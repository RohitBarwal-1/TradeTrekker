from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    fname: str
    lname: str
    email: EmailStr  
    contact: str
    is_staff: bool
    is_active: bool
    password: str
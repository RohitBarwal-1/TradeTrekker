from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"  # Change this if using a remote DB
client = AsyncIOMotorClient(MONGO_URI)
db = client["tradetrekker"]  # Database Name
users_collection = db["users"]  # Collection Name


async def create_indexes():
    await users_collection.create_index("username", unique=True)

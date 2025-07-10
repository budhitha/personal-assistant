import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"

# CORS middleware for local React dev (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str


@app.post("/chat")
async def chat_with_mistral(req: Request):
    data = await req.json()
    user_prompt = data.get("prompt", "")

    payload = {
        "model": "mistral",
        "prompt": user_prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    result = response.json()
    return {"response": result["response"]}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    # Here you can integrate AI, business logic, or static replies
    user_prompt = req.message

    payload = {
        "model": "mistral",
        "prompt": user_prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    result = response.json()

    return ChatResponse(reply=result["response"])

app.mount("/", StaticFiles(directory="frontend/build", html=True), name="frontend")
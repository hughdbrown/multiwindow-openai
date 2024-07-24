from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def main():
    with open("templates/index.html") as f:
        return HTMLResponse(f.read())

@app.get("/hello", response_class=HTMLResponse)
async def hello():
    return HTMLResponse("<h1>Hello World</h1>")

@app.get("/calculator", response_class=HTMLResponse)
async def calculator():
    with open("templates/calculator.html") as f:
        return HTMLResponse(f.read())

@app.get("/external", response_class=HTMLResponse)
async def external():
    return HTMLResponse('<iframe src="https://example.com" width="100%" height="100%"></iframe>')

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

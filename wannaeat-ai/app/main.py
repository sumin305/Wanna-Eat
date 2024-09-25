import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils import process_image  

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
import io
import cv2

app = FastAPI()

@app.post("/api/edit-image/")
async def process_uploaded_image(file: UploadFile = File(...)):
    contents = await file.read()
    processed_image = process_image(contents)
    _, buffer = cv2.imencode('.png', processed_image)
    return StreamingResponse(io.BytesIO(buffer.tobytes()), media_type="image/png")

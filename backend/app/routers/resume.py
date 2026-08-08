from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
from pathlib import Path
from uuid import uuid4
from app.ai.ats import analyze_resume
from app.services.pdf_parser import extract_text_from_pdf
from app.services.docx_parser import extract_text_from_docx

router = APIRouter(prefix="/resume", tags=["Resume"])

# backend/uploads
UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    allowed_extensions = [".pdf", ".docx"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    filename = f"{uuid4()}{extension}"

    file_path = UPLOAD_DIR / filename

    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)
        
        
    print("Saved file:", file_path)
    print("Size:", file_path.stat().st_size, "bytes")
    
    
    if extension == ".pdf":
        extracted_text = extract_text_from_pdf(str(file_path))
    else:
        extracted_text = extract_text_from_docx(str(file_path))

    analysis = analyze_resume(extracted_text)

    return {
        "message": "Resume uploaded successfully",
        "filename": filename,
        "original_filename": file.filename,
        "text": extracted_text,
        "analysis": analysis,
    }
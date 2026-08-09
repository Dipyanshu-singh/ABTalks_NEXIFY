from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from pathlib import Path
from uuid import uuid4
from app.ai.gemini_analyzer import analyze_resume_with_gemini
from app.services.pdf_parser import extract_text_from_pdf
from app.services.docx_parser import extract_text_from_docx

router = APIRouter(prefix="/resume", tags=["Resume"])

BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
STORAGE_DIR = BASE_DIR / "storage"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
STORAGE_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file or not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded or invalid filename."
        )

    filename = file.filename
    extension = os.path.splitext(filename)[1].lower()
    allowed_extensions = [".pdf", ".docx"]

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF (.pdf) and Word (.docx) files are supported."
        )

    saved_filename = f"{uuid4()}{extension}"
    file_path = UPLOAD_DIR / saved_filename

    try:
        contents = await file.read()
        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty (0 bytes)."
            )

        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        print(f"Saved file: {file_path} ({len(contents)} bytes)")

        try:
            if extension == ".pdf":
                extracted_text = extract_text_from_pdf(str(file_path))
            else:
                extracted_text = extract_text_from_docx(str(file_path))
        except Exception as parse_err:
            print("Parsing error:", parse_err)
            raise HTTPException(
                status_code=400,
                detail=f"Could not parse {extension.upper()} file. Please check file format."
            )

        if not extracted_text or not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from file. Please ensure it contains selectable text (not scanned image)."
            )

        analysis = analyze_resume_with_gemini(extracted_text)

        try:
            (STORAGE_DIR / "resume.txt").write_text(
                extracted_text,
                encoding="utf-8"
            )
        except Exception as storage_err:
            print("Warning: Storage write error:", storage_err)

        return {
            "message": "Resume uploaded successfully",
            "analysis": analysis
        }

    except HTTPException as he:
        raise he
    except Exception as err:
        print(f"Unexpected error in upload_resume: {err}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process resume: {str(err)}"
        )
    finally:
        if file_path.exists():
            try:
                os.remove(file_path)
            except Exception as clean_err:
                print("Could not clean temp file:", clean_err)
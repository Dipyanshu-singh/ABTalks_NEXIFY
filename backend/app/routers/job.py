from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.job_matcher import match_resume_job

router = APIRouter(prefix="/job", tags=["Job Matcher"])


class JobRequest(BaseModel):
    resume_text: str
    job_description: str


@router.post("/match")
async def job_match(request: JobRequest):

    analysis = match_resume_job(
        request.resume_text,
        request.job_description,
    )

    return analysis
from fastapi import APIRouter
from app.ai.interview_ai import generate_questions

router = APIRouter(prefix="/interview", tags=["Interview"])


@router.get("/start")
def start_interview():

    questions = generate_questions()

    return {
        "questions": questions
    }
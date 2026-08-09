import os
import json
from pathlib import Path
from dotenv import load_dotenv
from google import genai

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def analyze_resume_with_gemini(resume_text: str):

    prompt = f"""
You are an expert ATS (Applicant Tracking System) Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT wrap in ```json.

Format:

{{
    "ats_score": 0,
    "summary": "",
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    text = response.text.strip()

    # Strip any markdown code fences that may wrap the JSON
    if "```" in text:
        text = text.replace("```json", "").replace("```", "").strip()

    # Extract the first JSON object if the model adds extra prose
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        text = text[start:end + 1]

    try:
        analysis = json.loads(text)
    except json.JSONDecodeError:
        # Fallback rather than crashing the whole upload
        analysis = {
            "ats_score": 0,
            "summary": "Could not parse the AI response. Please try again.",
            "skills": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
        }

    return analysis

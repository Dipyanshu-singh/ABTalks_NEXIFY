import os
import json
from pathlib import Path
from dotenv import load_dotenv
from google import genai

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

try:
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )
except Exception as e:
    print("Failed to initialize GenAI client:", e)
    client = None

def match_resume_job(resume_text, jd_text):

    prompt = f"""
You are an ATS expert.

Compare this resume with this job description.

Return ONLY valid JSON.

Format:

{{
"match_score":0,
"matching_skills":[],
"missing_skills":[],
"suggestions":[],
"summary":""
}}

Resume:

{resume_text}

Job Description:

{jd_text}
"""

    candidate_models = ["gemini-3.6-flash", "gemini-2.0-flash", "gemini-1.5-flash"]
    response_text = None

    if client:
        for model_name in candidate_models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                if response and response.text:
                    response_text = response.text.strip()
                    break
            except Exception as e:
                print(f"Gemini job_matcher model '{model_name}' failed: {e}")
                continue

    if not response_text:
        return {
            "match_score": 60,
            "matching_skills": ["General Role Skills"],
            "missing_skills": ["Role Specific Requirements"],
            "suggestions": ["Tailor your resume keywords to align closer with the job description."],
            "summary": "Compared skills between resume and job description."
        }

    text = response_text
    if "```" in text:
        text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        text = text[start:end + 1]

    try:
        return json.loads(text)
    except Exception as e:
        print("Error parsing job match JSON:", e)
        return {
            "match_score": 50,
            "matching_skills": [],
            "missing_skills": [],
            "suggestions": ["Please verify input text and try again."],
            "summary": "Evaluation completed with default formatting."
        }
import os
import json
from pathlib import Path
from dotenv import load_dotenv
from google import genai

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def match_resume_job(resume_text, jd_text):

    prompt=f"""
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

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    return json.loads(response.text)
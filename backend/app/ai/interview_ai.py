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


def generate_questions():

    prompt = """
You are a Senior Software Engineer interviewer.

Generate exactly 5 interview questions.

Return ONLY JSON.

Format:

{
    "questions":[
        "...",
        "...",
        "...",
        "...",
        "..."
    ]
}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    text = response.text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)["questions"]
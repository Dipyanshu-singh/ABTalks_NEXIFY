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

    default_questions = [
        "Tell me about a challenging software engineering project you worked on.",
        "How do you ensure code quality and maintainability in your applications?",
        "Explain how RESTful APIs work and how you handle security and authentication.",
        "How do you approach identifying and fixing performance bottlenecks in a system?",
        "What strategies do you use for software design and system architecture?"
    ]

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
                print(f"Gemini interview_ai model '{model_name}' failed: {e}")
                continue

    if not response_text:
        return default_questions

    text = response_text
    if "```" in text:
        text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        text = text[start:end + 1]

    try:
        data = json.loads(text)
        return data.get("questions", default_questions)
    except Exception as e:
        print("Error parsing interview questions JSON:", e)
        return default_questions
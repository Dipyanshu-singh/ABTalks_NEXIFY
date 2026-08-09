import os
import json
from pathlib import Path
from dotenv import load_dotenv
from google import genai

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

try:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print("Failed to initialize GenAI client:", e)
    client = None


def fallback_resume_analysis(resume_text: str) -> dict:
    text_lower = resume_text.lower()
    
    known_skills = [
        "Python", "JavaScript", "TypeScript", "React", "Node.js", "FastAPI", "Django",
        "SQL", "PostgreSQL", "MongoDB", "HTML", "CSS", "Git", "Docker", "AWS", "REST API",
        "C++", "Java", "Kubernetes", "GraphQL", "Redux", "Express", "Tailwind"
    ]
    found_skills = [s for s in known_skills if s.lower() in text_lower]

    word_count = len(resume_text.split())
    
    strengths = []
    weaknesses = []
    suggestions = []
    
    if word_count > 150:
        strengths.append(f"Comprehensive length ({word_count} words).")
    else:
        weaknesses.append("Resume is brief and lacks detailed descriptions.")
        suggestions.append("Add more details about your work experience and achievements.")
        
    if found_skills:
        strengths.append(f"Identified core technical skills: {', '.join(found_skills[:6])}.")
    else:
        weaknesses.append("Few standard technical keywords detected.")
        suggestions.append("Highlight your technical skills and tools explicitly in a dedicated section.")
        
    if any(kw in text_lower for kw in ["experience", "employment", "work history", "project"]):
        strengths.append("Contains work experience or projects section.")
    else:
        weaknesses.append("Missing clear Experience or Projects section.")
        suggestions.append("Include an Experience section outlining previous roles and responsibilities.")
        
    if any(kw in text_lower for kw in ["education", "degree", "university", "bachelor"]):
        strengths.append("Contains Education credentials.")
    else:
        weaknesses.append("Missing explicit Education section.")
        suggestions.append("Add your educational background and degree details.")

    # Calculate ATS score heuristic
    base_score = 40
    if word_count > 200:
        base_score += 20
    base_score += min(30, len(found_skills) * 5)
    if "experience" in text_lower or "project" in text_lower:
        base_score += 10
    ats_score = min(95, max(25, base_score))

    return {
        "ats_score": ats_score,
        "summary": f"Resume evaluated ({word_count} words, {len(found_skills)} tech skills detected).",
        "skills": found_skills if found_skills else ["General Professional Skills"],
        "strengths": strengths if strengths else ["Basic resume content provided."],
        "weaknesses": weaknesses if weaknesses else ["Formatting and keyword coverage can be enhanced."],
        "suggestions": suggestions if suggestions else [
            "Tailor your resume keywords to specific job descriptions.",
            "Use standard formatting and bullet points for better ATS readability."
        ]
    }


def analyze_resume_with_gemini(resume_text: str):
    if not resume_text or not resume_text.strip():
        return {
            "ats_score": 0,
            "summary": "The uploaded file contained no readable text.",
            "skills": [],
            "strengths": [],
            "weaknesses": ["No text could be extracted from the uploaded document."],
            "suggestions": ["Upload a PDF or DOCX file with selectable text rather than scanned images."]
        }

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
                print(f"Gemini API model '{model_name}' failed: {e}")
                continue

    if not response_text:
        print("All Gemini models failed or client unavailable. Using fallback analysis.")
        return fallback_resume_analysis(resume_text)

    text = response_text
    if "```" in text:
        text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        text = text[start:end + 1]

    try:
        analysis = json.loads(text)
        for req_key in ["ats_score", "summary", "skills", "strengths", "weaknesses", "suggestions"]:
            if req_key not in analysis:
                raise ValueError(f"Missing required key: {req_key}")
        return analysis
    except Exception as err:
        print(f"Error parsing Gemini JSON response: {err}")
        return fallback_resume_analysis(resume_text)

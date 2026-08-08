import re

SKILLS = [
    "python",
    "java",
    "c++",
    "javascript",
    "react",
    "node",
    "fastapi",
    "django",
    "flask",
    "sql",
    "mongodb",
    "postgresql",
    "git",
    "docker",
    "aws",
    "machine learning",
    "tensorflow",
    "pytorch",
    "html",
    "css",
]


def analyze_resume(text: str):

    text = text.lower()

    found = []

    missing = []

    for skill in SKILLS:
        if re.search(rf"\b{re.escape(skill)}\b", text):
            found.append(skill)
        else:
            missing.append(skill)

    score = int((len(found) / len(SKILLS)) * 100)

    return {
        "ats_score": score,
        "skills_found": found,
        "missing_skills": missing[:10],
    }
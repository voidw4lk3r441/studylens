from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_STUDYLENS_DATA = {
    "physics": {
        "studentName": "Arka Purkait",
        "testName": "JEE Mock Test - Physics",
        "metrics": {
            "totalQuestions": 30,
            "incorrectAnswers": 8,
            "accuracy": 73.3,
            "predictedScoreImprovement": 24
        },
        "mistakeDistribution": [
            {"type": "Silly Mistake", "count": 4, "color": "#ef4444"},
            {"type": "Conceptual Error", "count": 2, "color": "#f59e0b"},
            {"type": "Time Pressure", "count": 2, "color": "#3b82f6"}
        ],
        "topicWeaknesses": [
            {"topic": "Projectile Motion", "score": 85},
            {"topic": "Relative Velocity", "score": 40},
            {"topic": "Newton's Laws", "score": 62}
        ],
        "performanceTrend": [
            {"test": "Mock 1", "score": 58},
            {"test": "Mock 2", "score": 66},
            {"test": "Mock 3", "score": 73}
        ],
        "recommendations": [
            "Practice Relative Velocity for 20 mins daily.",
            "Reduce skipped intermediate calculation steps.",
            "Attempt lengthy calculations earlier in the paper."
        ],
        "behavioralInsight": "Accuracy drops significantly after the 90-minute mark due to fatigue."
    },

    "chemistry": {
        "studentName": "Arka Purkait",
        "testName": "JEE Mock Test - Chemistry",
        "metrics": {
            "totalQuestions": 30,
            "incorrectAnswers": 6,
            "accuracy": 80,
            "predictedScoreImprovement": 16
        },
        "mistakeDistribution": [
            {"type": "Conceptual Error", "count": 4, "color": "#f59e0b"},
            {"type": "Misread Question", "count": 1, "color": "#10b981"},
            {"type": "Silly Mistake", "count": 1, "color": "#ef4444"}
        ],
        "topicWeaknesses": [
            {"topic": "Hydrocarbons", "score": 45},
            {"topic": "Kinetics", "score": 90},
            {"topic": "Thermodynamics", "score": 70}
        ],
        "performanceTrend": [
            {"test": "Mock 1", "score": 60},
            {"test": "Mock 2", "score": 72},
            {"test": "Mock 3", "score": 80}
        ],
        "recommendations": [
            "Revise SN1 vs SN2 mechanisms.",
            "Improve question-reading accuracy.",
            "Focus on timed physical chemistry practice."
        ],
        "behavioralInsight": "Organic mechanism questions consume excessive time."
    },

    "math": {
        "studentName": "Arka Purkait",
        "testName": "JEE Mock Test - Mathematics",
        "metrics": {
            "totalQuestions": 30,
            "incorrectAnswers": 11,
            "accuracy": 63.3,
            "predictedScoreImprovement": 36
        },
        "mistakeDistribution": [
            {"type": "Silly Mistake", "count": 5, "color": "#ef4444"},
            {"type": "Conceptual Error", "count": 3, "color": "#f59e0b"},
            {"type": "Time Pressure", "count": 3, "color": "#3b82f6"}
        ],
        "topicWeaknesses": [
            {"topic": "Definite Integrals", "score": 35},
            {"topic": "Matrices", "score": 55},
            {"topic": "Vectors", "score": 78}
        ],
        "performanceTrend": [
            {"test": "Mock 1", "score": 48},
            {"test": "Mock 2", "score": 55},
            {"test": "Mock 3", "score": 63}
        ],
        "recommendations": [
            "Write all substitution constraints explicitly.",
            "Avoid skipping intermediate layout steps.",
            "Practice matrix calculations under time pressure."
        ],
        "behavioralInsight": "Most lost marks are due to skipped intermediate steps."
    }
}


@app.get("/api/analysis/{subject}")
def get_analysis(subject: str):
    return MOCK_STUDYLENS_DATA.get(subject.lower(), {})
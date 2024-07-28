from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

import form
import credential_handler

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"
FORM_ID = "1z1gSbypa9DpGgThq1D-JveOc2Py__Rzr309bFZTmYR4"

creds = credential_handler.get_creds()

@app.get("/possible_answers")
def get_all_possible_answers() -> Dict[str, Any]:
    questions_data = form.get_questions()
    all_possible_answers = process_questions(questions_data)
    return all_possible_answers

@app.get("/")
async def read_root():
    responses = form.get_responses()["responses"]
    questions_data = form.get_questions()
    
    question_map = build_question_map(questions_data)
    question_answers_map = map_answers_to_questions(responses, question_map)
    questions_with_answers = format_questions_with_answers(question_map, question_answers_map)

    return {"questions_with_answers": questions_with_answers}

@app.get("/titles")
async def read_titles():
    questions_data = form.get_questions()
    questions = []
    for item in questions_data['items']:
        questions.append(item['title'])
    return {"questions": questions}

def process_questions(questions_data: Dict[str, Any]) -> Dict[str, Any]:
    all_possible_answers = {}

    for item in questions_data.get("items", []):
        if "questionItem" in item:
            question_entry = extract_question_item(item)
            all_possible_answers[question_entry["id"]] = question_entry
        elif "questionGroupItem" in item:
            subquestions = extract_subquestions(item)
            all_possible_answers.update(subquestions)
    
    return all_possible_answers

def extract_question_item(item: Dict[str, Any]) -> Dict[str, Any]:
    question = item["questionItem"]["question"]
    question_id = question.get("questionId", "Unknown ID")
    question_entry = {
        "id": question_id,
        "title": item.get("title", "No Title"),
        "type": "choice" if "choiceQuestion" in question else "scale"
    }

    if "choiceQuestion" in question:
        options = question["choiceQuestion"].get("options", [])
        question_entry["options"] = [option.get("value", "No Value") for option in options]
    elif "scaleQuestion" in question:
        question_entry["low_label"] = question["scaleQuestion"].get("lowLabel", "No Low Label")
        question_entry["high_label"] = question["scaleQuestion"].get("highLabel", "No High Label")
    
    return question_entry

def extract_subquestions(item: Dict[str, Any]) -> Dict[str, Any]:
    subquestions = {}
    for sub_item in item.get("questionGroupItem", {}).get("questions", []):
        subquestion_id = sub_item.get("questionId", "Unknown ID")
        subquestions[subquestion_id] = {
            "id": subquestion_id,
            "title": sub_item.get("rowQuestion", {}).get("title", "No Title"),
            "type": "subquestion"
        }
    return subquestions

def build_question_map(questions_data: Dict[str, Any]) -> Dict[str, str]:
    question_map = {}

    for item in questions_data.get("items", []):
        if "questionItem" in item:
            question_id = item["questionItem"]["question"].get("questionId")
            question_title = item.get("title", "No Title")
            question_map[question_id] = question_title
        elif "questionGroupItem" in item:
            for sub_item in item.get("questionGroupItem", {}).get("questions", []):
                question_id = sub_item.get("questionId")
                question_title = sub_item.get("rowQuestion", {}).get("title", "No Title")
                question_map[question_id] = question_title

    return question_map

def map_answers_to_questions(responses: Any, question_map: Dict[str, str]) -> Dict[str, list]:
    question_answers_map = {question_id: [] for question_id in question_map.keys()}

    for response in responses:
        for question_id, answer_info in response.get("answers", {}).items():
            answers = [answer.get("value", "") for answer in answer_info.get("textAnswers", {}).get("answers", [])]
            question_answers_map[question_id].extend(answers)

    return question_answers_map

def format_questions_with_answers(question_map: Dict[str, str], question_answers_map: Dict[str, list]) -> list:
    questions_with_answers = []

    for question_id, answers in question_answers_map.items():
        question_title = question_map.get(question_id, "Unknown Question")
        questions_with_answers.append({
            "question": question_title,
            "answers": answers
        })

    return questions_with_answers

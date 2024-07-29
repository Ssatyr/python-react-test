import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchSurveyData = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

export const fetchPossibleAnswers = async () => {
  const response = await axios.get(`${API_URL}/possible_answers`);
  return response.data;
};
export const fetchQuestionTitles = async () => {
  const response = await fetch("http://127.0.0.1:8000/titles");
  const data = await response.json();
  return data.questions;
};

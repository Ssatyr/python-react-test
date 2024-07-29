export interface SurveyResponse {
  question: string;
  answers: string[];
}

export interface PossibleAnswer {
  id: string;
  title: string;
  type: string;
  options?: string[];
  low_label?: string;
  high_label?: string;
}

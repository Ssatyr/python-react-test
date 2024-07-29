import React, { useEffect, useState } from "react";
import {
  fetchSurveyData,
  fetchPossibleAnswers,
  fetchQuestionTitles,
} from "../services/api";
import { SurveyResponse, PossibleAnswer } from "../types";
import AccordionItem from "./AccordionItem";
import GroupedBarChart from "./GroupedBarChart";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const SurveyDashboard: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<{
    [key: string]: PossibleAnswer;
  }>({});
  const [questionTitles, setQuestionTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchSurveyData();
        setSurveyData(responses.questions_with_answers);

        const possibleAnswersResponse = await fetchPossibleAnswers();
        setPossibleAnswers(possibleAnswersResponse);

        const titles = await fetchQuestionTitles();
        setQuestionTitles(titles);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleToggle = (questionId: string) => {
    setExpandedQuestionId((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  const firstFourSubQuestions = surveyData.slice(-8, -4);
  const secondFourSubQuestions = surveyData.slice(-4);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Survey Results</h1>
      <div className="accordion" id="surveyAccordion">
        {surveyData.slice(0, -8).map((item, index) => {
          const questionId =
            Object.keys(possibleAnswers).find(
              (id) => possibleAnswers[id].title === item.question
            ) || "";

          return (
            <AccordionItem
              key={index}
              item={item}
              questionId={questionId}
              questionTitle={questionTitles[index]}
              possibleAnswers={possibleAnswers}
              expandedQuestionId={expandedQuestionId}
              handleToggle={handleToggle}
              index={index}
            />
          );
        })}
      </div>

      <GroupedBarChart
        questions={firstFourSubQuestions}
        title={questionTitles[questionTitles.length - 2]}
      />
      <GroupedBarChart
        questions={secondFourSubQuestions}
        title={questionTitles[questionTitles.length - 1]}
      />
    </div>
  );
};

export default SurveyDashboard;

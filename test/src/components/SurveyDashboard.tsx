import React, { useEffect, useState } from "react";
import {
  fetchSurveyData,
  fetchPossibleAnswers,
  fetchQuestionTitles,
} from "../services/api";
import { Pie, Bar } from "react-chartjs-2";
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
import "bootstrap/dist/css/bootstrap.min.css";

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

interface SurveyResponse {
  question: string;
  answers: string[];
}

interface PossibleAnswer {
  id: string;
  title: string;
  type: string;
  options?: string[];
  low_label?: string;
  high_label?: string;
}

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
        // Fetch survey responses
        const responses = await fetchSurveyData();
        setSurveyData(responses.questions_with_answers);

        // Fetch possible answers
        const possibleAnswersResponse = await fetchPossibleAnswers();
        setPossibleAnswers(possibleAnswersResponse);

        // Fetch question titles
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

  // Function to get chart data for pie chart
  const getPieChartData = (answers: string[], questionId: string) => {
    const questionInfo = possibleAnswers[questionId];
    const options = questionInfo?.options || [];

    const answerCounts: Record<string, number> = {};
    answers.forEach((answer) => {
      answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });

    return {
      labels: options,
      datasets: [
        {
          data: options.map((option) => answerCounts[option] || 0),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
  };

  // Function to get chart data for bar chart
  const getBarChartData = (answers: string[]) => {
    const total = answers.reduce((sum, value) => sum + parseInt(value, 10), 0);
    const average = total / answers.length;

    return {
      labels: [""],
      datasets: [
        {
          label: "Average Score",
          data: [average],
          backgroundColor: (context: any) => {
            const value = context.raw;
            const gradient = context.chart.ctx.createLinearGradient(
              0,
              0,
              context.chart.width,
              0
            );
            gradient.addColorStop(0, "#FF6384");
            gradient.addColorStop(value / 10, "#FF6384");
            gradient.addColorStop(value / 10, "#E0E0E0");
            gradient.addColorStop(1, "#E0E0E0");
            return gradient;
          },
        },
      ],
    };
  };

  // Function to get data for grouped bar chart
  const getGroupedBarChartData = (questions: SurveyResponse[]) => {
    const labels = questions.map((q) => q.question);
    const datasets = questions[0].answers.map((_, idx) => ({
      label: `${idx + 1}`,
      data: questions.map((q) => parseInt(q.answers[idx], 10)),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][
        idx % 5
      ],
    }));

    return {
      labels,
      datasets,
    };
  };

  const handleToggle = (questionId: string) => {
    setExpandedQuestionId((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  // Assuming the last 8 subquestions are the ones to be grouped into two sets of 4
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
          const isExpanded = expandedQuestionId === questionId;

          return (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    isExpanded ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleToggle(questionId)}
                >
                  {questionTitles[index]}
                </button>
              </h2>
              {isExpanded && (
                <div
                  className="accordion-collapse collapse show"
                  aria-labelledby={`heading${index}`}
                >
                  <div className="accordion-body">
                    {possibleAnswers[questionId]?.type === "choice" ? (
                      <Pie data={getPieChartData(item.answers, questionId)} />
                    ) : (
                      <Bar
                        data={getBarChartData(item.answers)}
                        options={{
                          indexAxis: "y",
                          scales: {
                            x: {
                              min: 1,
                              max: 10,
                              ticks: {
                                stepSize: 1,
                              },
                            },
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="mt-4">First Set of Subquestions</h2>
      <Bar
        data={getGroupedBarChartData(firstFourSubQuestions)}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />

      <h2 className="mt-4">Second Set of Subquestions</h2>
      <Bar
        data={getGroupedBarChartData(secondFourSubQuestions)}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SurveyDashboard;

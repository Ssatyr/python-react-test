import React from "react";
// @ts-ignore
import { Pie, Bar } from "react-chartjs-2";
import { SurveyResponse, PossibleAnswer } from "../types";

interface AccordionItemProps {
  item: SurveyResponse;
  questionId: string;
  questionTitle: string;
  possibleAnswers: { [key: string]: PossibleAnswer };
  expandedQuestionId: string | null;
  handleToggle: (questionId: string) => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  questionId,
  questionTitle,
  possibleAnswers,
  expandedQuestionId,
  handleToggle,
  index,
}) => {
  const isExpanded = expandedQuestionId === questionId;

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

  return (
    <div key={index} className="accordion-item">
      <h2 className="accordion-header" id={`heading${index}`}>
        <button
          className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
          type="button"
          onClick={() => handleToggle(questionId)}
        >
          {questionTitle}
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
};

export default AccordionItem;

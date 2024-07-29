import React from "react";
import { Bar } from "react-chartjs-2";
import { SurveyResponse } from "../types";

interface GroupedBarChartProps {
  questions: SurveyResponse[];
  title: string;
}

const GroupedBarChart: React.FC<GroupedBarChartProps> = ({
  questions,
  title,
}) => {
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

  return (
    <div>
      <h2 className="mt-4">{title}</h2>
      <Bar
        data={getGroupedBarChartData(questions)}
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

export default GroupedBarChart;

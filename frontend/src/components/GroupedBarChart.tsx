import React from "react";
// @ts-ignore
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

    // Determine if answers are numerical or textual
    const isNumerical = !isNaN(parseInt(questions[0].answers[0], 10));

    if (isNumerical) {
      const datasets = questions[0].answers.map((_, idx) => ({
        label: `${idx + 1}`,
        data: questions.map((q) => parseInt(q.answers[idx], 10)),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ][idx % 5],
      }));

      return {
        labels,
        datasets,
      };
    } else {
      const answerOptions = Array.from(
        new Set(questions.flatMap((q) => q.answers))
      );

      const datasets = answerOptions.map((option, idx) => ({
        label: option,
        data: questions.map(
          (q) => q.answers.filter((answer) => answer === option).length
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ][idx % 5],
      }));

      return {
        labels,
        datasets,
      };
    }
  };

  return (
    <div className="chart-container">
      <h2 className="mt-4 text-center">{title}</h2>
      <div className="chart-wrapper">
        <Bar
          data={getGroupedBarChartData(questions)}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GroupedBarChart;

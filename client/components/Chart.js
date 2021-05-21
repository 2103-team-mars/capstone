import React from "react";
import { Bar } from "react-chartjs-2";
import "../../public/style.css";

const Chart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: ["20-29", "30-39", "40-49", "50-59"],
          xAxisID: "Age Group Range",
          yAxisID: "BMI",
          datasets: [
            {
              label: "Male Average BMI",
              data: [26.8, 29, 29, 30.1],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
            {
              label: "Female Average BMI",
              data: [27.2, 28, 28.4, 29.8],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2),rgba(255, 99, 132, 0.2),rgba(255, 99, 132, 0.2),rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
          options: {
            plugins: {
              title: {
                align: "center",
                display: true,
                text: "Average BMI by Age Group in the United States",
                padding: {
                  top: 10,
                  bottom: 30,
                },
              },
            },
            scales: {
              yAxes: {
                beginAtZero: true,
                label: "BMI",
              },
            },
          },
        }}
        height={400}
        weight={700}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Chart;

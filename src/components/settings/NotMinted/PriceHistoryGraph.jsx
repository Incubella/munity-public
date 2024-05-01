// PriceHistoryGraph.jsx
import React from "react";
import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";

// Register the necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate the past 7 days, including today
const generateLastSevenDays = () => {
  const dates = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }
  return dates;
};

const PriceHistoryGraph = ({ theme }) => {
  // Define the chart data
  const data = {
    labels: generateLastSevenDays(),
    datasets: [
      {
        label: "Price History",
        data: [0, 45, 33, 65, 60, 100],
        borderColor: "#34A4E0",
        backgroundColor: "rgba(52, 164, 224, 0.1)",
        pointBackgroundColor: "#34A4E0",
        tension: 0.4, // This makes the line curved. Remove or set to 0 for straight lines.
      },
    ],
  };

  // Define the chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category", // Define the scale type
        grid: {
          display: false, // This will remove the grid lines on the x-axis
        },
        title: {
          display: false,
        },
        ticks: {
          color: `${theme === "light" ? "#10111B" : "#fff"}`, // Change to the desired color
          padding: 10, // Adjust the space between the ticks and the axis
        },
        afterFit: (scale) => {
          scale.paddingLeft = 20; // Adjust the space on the left side of the x-axis
          scale.paddingRight = 20; // Adjust the space on the right side if needed
        },
      },
      y: {
        type: "linear", // Define the scale type
        grid: {
          display: false, // This will remove the grid lines on the y-axis
          drawBorder: false, // This will remove the y-axis line
        },
        title: {
          display: false,
        },
        beginAtZero: true, // Start the y-axis at 0
        ticks: {
          color: `${theme === "light" ? "#10111B" : "#fff"}`, // Change to the desired color
        },
      },
    },
    elements: {
      point: {
        radius: 0, // Hide points on the line
        hoverRadius: 6, // Show point on hover
        hoverBorderWidth: 4, // Border of the point on hover
      },
      line: {
        borderWidth: 2, // Set the line thickness
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
        fill: "start", // Fill the area under the line
      },
      tooltip: {
        // Customize the tooltip
        callbacks: {
          title: function (context) {
            // Format the title displayed in the tooltip
            return context[0].label;
          },
          label: function (context) {
            // Use an array of strings for multi-line tooltips. Each item in array is a new line.
            let tooltipText = [];
            tooltipText.push(`Date: ${context.label}`);
            tooltipText.push(`Avg. price: ${context.parsed.y} ETH`);
            tooltipText.push(`Volume: 20 eth`); // Replace with actual volume data
            tooltipText.push(`num. sales: 1`); // Replace with actual sales data
            return tooltipText;
          },
        },
        backgroundColor: `${theme === "light" ? "#10111B" : "#fff"}`, // Tooltip background color
        titleColor: `${theme === "dark" ? "#10111B" : "#fff"}`, // Title color inside the tooltip
        bodyColor: `${theme === "dark" ? "#10111B" : "#fff"}`, // Body color inside the tooltip
        titleFont: {
          size: 12, // Title font size
        },
        bodyFont: {
          size: 12, // Body font size
        },
        padding: 12, // Tooltip padding
        displayColors: false, // Do not display the colored box next to the tooltip text
        position: "nearest", // The tooltip will appear close to the element that is being hovered
        intersect: false,
        mode: "index",
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    maintainAspectRatio: false, // Set to false to make the chart responsive
  };

  // Render the line chart within the component
  return (
    <Box>
      <Box style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default PriceHistoryGraph;

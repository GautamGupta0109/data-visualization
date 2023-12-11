import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Chart from "chart.js/auto";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      createBarChart(data);
    }
  }, [data]);

  const createBarChart = (data) => {
    const ctx = document.getElementById("barChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => `ID: ${item.id}`),
        datasets: [
          {
            label: "Sample Data",
            data: data.map((item) => item.id * 10), // Sample data for bar heights
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="container">
      <h1>Data Table</h1>
      <table className="dataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-container">
        <h1>Bar Chart</h1>
        <canvas id="barChart"></canvas>
      </div>
    </div>
  );
}

export default App;

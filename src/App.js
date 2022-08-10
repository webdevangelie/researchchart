import { useState } from "react";
import "./App.css";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function App() {
  const [data, setData] = useState(null);

  const chartStyle = {
    width: "55%",
    height: "35%",
    margin: "auto",
  };

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = {
          labels: results.data.map((item) => item.Year),
          datasets: [
            {
              type: "line",
              label: Object.keys(results.data[0])[2],
              borderColor: "rgb(28, 190, 202)",
              borderWidth: 2,
              fill: false,
              data: results.data.map((item) => item.AI * 100),
            },
            {
              type: "bar",
              label: Object.keys(results.data[0])[1],
              backgroundColor: "rgb(0, 133, 58)",
              data: results.data.map((item) => item.Change * 100),
              //borderColor: "white",
              borderWidth: 2,
              enabled: true,
            },
          ],
        };
        setData(data);
        console.log(results.data.map((item) => item.Year));
        console.log(results.data.map((item) => item.Change));
        console.log(results.data.map((item) => item.AI));
      },
    });
  };
  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />

      <div style={chartStyle}>
        <h2>AFFORDABILITY INDEX V. PRICE MOVEMENT HOUSE</h2>
        {data && <Chart type="bar" data={data} />}
      </div>
    </div>
  );
}

export default App;

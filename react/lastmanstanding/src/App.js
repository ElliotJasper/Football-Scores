import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch("/api/v1/info/date/2023-03-05");
      let body = await data.json();
      setData(body);
    };

    fetchData();
  }, []);

  if (data) {
    console.log(data);
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.homeName} {item.homeScore} - {item.awayScore} {item.awayName}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;

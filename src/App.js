import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <div className="clock-container">
        <h1 className="title">🕒 Jam Digital</h1>
        <div className="clock">
          {time.toLocaleTimeString()}
        </div>
        <p className="date">{time.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}</p>
      </div>
    </div>
  );
}

export default App;
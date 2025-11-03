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
      <h1>Jam Digital</h1>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default App;

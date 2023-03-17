import React, { useState, useEffect } from "react";

function CountdownTimer(props) {
  const [timeLeft, setTimeLeft] = useState(props.timeAllowed);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setTimeLeft(props.timeAllowed);
  }, [props.timeAllowed]);

  useEffect(() => {
    setTimeLeft(props.timeAllowed);
  }, [props.currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      props.setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimeLeft(props.timeAllowed);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-white">
      <h1>
        <span className="text-sm">Time Remaining: </span>
        {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
      </h1>
    </div>
  );
}

export default CountdownTimer;

import React, { useEffect, useRef, useState } from "react";

const DomRef = () => {
  const [timer, setTimer] = useState(0);
  const IntervalRef = useRef<number | null>(null);
  const stopTimer = () => {
    if (IntervalRef.current) {
        window.clearInterval(IntervalRef.current);
    }
  };
  useEffect(() => {
    IntervalRef.current = window.setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);
  return (
    <>
      <div className="bg-black text-white p-11 rounded-lg font-sans">
        <div className="mb-2">Hook Timer : {timer}</div>
        <button
          onClick={() => stopTimer()}
          className="py-2 px-3 bg-blue-500 rounded-md font-semibold text-white hover:scale-110 duration-75 hover:bg-slate-500"
        >
          Stop Timer
        </button>
      </div>
    </>
  );
};

export default DomRef;

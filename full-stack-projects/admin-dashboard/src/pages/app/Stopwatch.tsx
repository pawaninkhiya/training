import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const formateTime = (timeSeconds: number) => {
  const hour = Math.floor(timeSeconds / 3600);
  const minute = Math.floor((timeSeconds % 3600) / 60);
  const seconds = timeSeconds % 60;

  const hourInString = hour.toString(10).padStart(2, "0");
  const minuteInString = minute.toString(10).padStart(2, "0");
  const secondsInString = seconds.toString(10).padStart(2, "0");
  return `${hourInString}:${minuteInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  useEffect(() => {
    let intervalID: number;
    if (isRunning) {
      intervalID = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [isRunning]);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>{formateTime(time)}</h2>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;

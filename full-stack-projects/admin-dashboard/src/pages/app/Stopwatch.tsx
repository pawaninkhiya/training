import { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const formateTime = (timeSeconds: number) => {
  const hour = Math.floor(timeSeconds / 3600);
  const minute = String(Math.floor((timeSeconds % 3600) / 60));
  const seconds = timeSeconds;

  return `${hour},${minute},${seconds}`;
};

const Stopwatch = () => {
  useEffect(() => {
    console.log(formateTime(3700));
  }, []);
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>00,00,00</h2>
            <button>Start</button>
            <button>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;

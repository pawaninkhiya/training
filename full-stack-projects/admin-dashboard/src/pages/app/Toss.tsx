import AdminSidebar from "../../components/AdminSidebar";

const Toss = () => {
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

export default Toss;

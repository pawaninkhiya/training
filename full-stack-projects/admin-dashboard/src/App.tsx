import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Product = lazy(() => import("./pages/Product"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Customer = lazy(() => import("./pages/Customer"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/management/TransactionManagement")
);
const BarCharts = lazy(() => import("./pages/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/charts/LineCharts"));

const Stopwatch = lazy(() => import("./pages/app/Stopwatch"));
const Coupon = lazy(() => import("./pages/app/Coupon"));
const Toss = lazy(() => import("./pages/app/Toss"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Link to="/admin/dashboard">
                <button>Visit Dashboard</button>
              </Link>
            }
          />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/transaction" element={<Transaction />} />

          {/* Charts */}

          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          {/* Apps */}

          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/toss" element={<Toss />} />

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

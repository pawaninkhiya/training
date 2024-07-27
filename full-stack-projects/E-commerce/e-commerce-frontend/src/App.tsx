import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/admin/Loader";
import Header from "./components/Header";

const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Search = lazy(() => import("./pages/Search"));
  const Cart = lazy(() => import("./pages/Cart"));
  const Shipping = lazy(() => import("./pages/Shipping"));
  const OrderDetails = lazy(() => import("./pages/Order"));
  const Order = lazy(() => import("./pages/OrderDetails"));
  const Login = lazy(() => import("./pages/Login"));

  // Admin Route import
  const Dashboard = lazy(() => import("./pages/admin/dashboard"));
  const Products = lazy(() => import("./pages/admin/products"));
  const Customers = lazy(() => import("./pages/admin/customers"));
  const Transaction = lazy(() => import("./pages/admin/transaction"));
  const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
  const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
  const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
  const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
  const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
  const Toss = lazy(() => import("./pages/admin/apps/toss"));
  const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
  const ProductManagement = lazy(
    () => import("./pages/admin/management/productmanagement")
  );
  const TransactionManagement = lazy(
    () => import("./pages/admin/management/transactionmanagement")
  );
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not logged in Route */}
          <Route path="/login" element={<Login />} />
          {/* Logged In user Routes */}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* Admin Route */}
          {/* <Route element={<ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} /> > */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />
          {/* Apps */}
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
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
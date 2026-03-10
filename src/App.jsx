import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Login";
import AdminRoute from "./routes/AdminRoute";
import Homepage from "./pages/Homepage";
import MenuPage from "./pages/Admin/Menu/MenuPage";
import ArchivedMenuPage from "./pages/Admin/Menu/ArchivedMenuPage";
import CarbPage from "./pages/Admin/Carb/CarbPage";
import OrderManagement from "./pages/Admin/Order/OrderManagement";
import UserLayout from "./layouts/UserLayout";
import Menupage from "./pages/Menupage";
import RegisterPage from "./pages/Register";
import Cartpage from "./pages/Cartpage";
import Historypage from "./pages/Historypage";
import DetailHistoryPage from "./pages/DetailHistoryPage";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Homepage />} /> {/* Landing Page */}
          <Route path="/menu" element={<Menupage />} />
          {/* Nanti tambah route menu/cart di sini */}
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/history" element={<Historypage />} />
          <Route path="/history/:id" element={<DetailHistoryPage />} />
          <Route
            path="/payment-success/:orderId"
            element={<PaymentSuccess />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/menu" element={<MenuPage />} />
          <Route path="/admin/menu/archived" element={<ArchivedMenuPage />} />
          <Route path="/admin/carb" element={<CarbPage />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

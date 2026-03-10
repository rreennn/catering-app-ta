import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-lightbg">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

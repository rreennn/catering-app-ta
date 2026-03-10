import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Sidebar() {
  const { logout } = useAuth();
  return (
    <div className="w-72 bg-gray-800 ">
      <div className="text-white min-h-screen p-4 flex flex-col gap-4 pt-10 font-display">
        <Link to="/admin" className="hover:text-gray-300 duration-150">
          Dashboard
        </Link>
        <Link to="/admin/menu" className="hover:text-gray-300 duration-150">
          Manajemen Menu
        </Link>
        <Link
          to="/admin/menu/archived"
          className="hover:text-gray-300 duration-150"
        >
          Arsip Menu
        </Link>
        <Link to="/admin/carb" className="hover:text-gray-300 duration-150">
          Manajemen Template Karbo
        </Link>
        <Link to="/admin/orders" className="hover:text-gray-300 duration-150">
          Manajemen Order
        </Link>
        <button onClick={logout} className="mt-5 bg-gray-600 p-1 rounded-xl">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;

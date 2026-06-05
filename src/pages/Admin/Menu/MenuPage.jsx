import { useEffect, useState } from "react";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getCarbTemplates,
} from "../../../services/menuService";

import MenuList from "./MenuList";
import MenuFormModal from "./MenuFormModal";
import Loading from "../../../components/Admin/Loading";
import Swal from "sweetalert2"

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [carbTemplates, setCarbTemplates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [filterDay, setFilterDay] = useState("");
  const [filterMeal, setFilterMeal] = useState("");

  /* ================= FETCH DATA ================= */

  const fetchMenus = async () => {
    try {
      const data = await getMenus();
      // Safety filter frontend
      const activeMenus = data.filter((menu) => menu.is_active !== false);

      setMenus(activeMenus);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCarbTemplates = async () => {
    try {
      const data = await getCarbTemplates();
      setCarbTemplates(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchMenus(), fetchCarbTemplates()]);
      setLoading(false);
    };

    init();
  }, []);

  /* ================= CRUD ================= */

  const handleCreate = () => {
    setSelectedMenu(null);
    setShowModal(true);
  };

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin Hapus Menu?",
      text: "Menu yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", 
      cancelButtonColor: "#3085d6", 
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMenu(id);

          setMenus((prev) => prev.filter((menu) => menu._id !== id));

          Swal.fire({
            title: "Terhapus!",
            text: "Menu berhasil dihapus dari sistem.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Gagal!",
            text: "Gagal menghapus menu. Silakan coba lagi.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleSubmit = async (payload, menuId) => {
    try {
      if (menuId) {
        await updateMenu(menuId, payload);
      } else {
        await createMenu(payload);
      }

      setShowModal(false);
      fetchMenus();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMenus = menus.filter((menu) => {
    const matchDay = filterDay ? menu.hari_tersedia?.includes(filterDay) : true;

    const matchMeal = filterMeal ? menu.meal_type === filterMeal : true;

    return matchDay && matchMeal;
  });

  if (loading)
    return (
      <div className="items-center flex justify-center h-screen">
        {" "}
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Menu</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200"
        >
          Tambah Menu
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* FILTER HARI */}
        <select
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}
          className="border px-3 rounded"
        >
          <option value="">Semua Hari</option>
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
          <option value="Sabtu">Sabtu</option>
        </select>

        {/* FILTER MEALTYPE */}
        <select
          value={filterMeal}
          onChange={(e) => setFilterMeal(e.target.value)}
          className="border px-3 rounded"
        >
          <option value="">Semua Meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        {/* RESET */}
        <button
          onClick={() => {
            setFilterDay("");
            setFilterMeal("");
          }}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-500 hover:text-white duration-200"
        >
          Reset
        </button>
      </div>

      <MenuList
        menus={filteredMenus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        mode="active"
      />

      {showModal && (
        <MenuFormModal
          menu={selectedMenu}
          carbTemplates={carbTemplates}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MenuPage;

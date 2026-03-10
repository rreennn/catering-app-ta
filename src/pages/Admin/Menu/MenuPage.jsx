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

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [carbTemplates, setCarbTemplates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

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
    if (!window.confirm("Yakin hapus menu?")) return;

    try {
      await deleteMenu(id);

      // remove langsung dari state
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    } catch (err) {
      console.error(err);
    }
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

  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Menu</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah Menu
        </button>
      </div>

      <MenuList
        menus={menus}
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

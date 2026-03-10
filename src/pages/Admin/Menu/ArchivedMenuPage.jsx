import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import { getArchivedMenus, activateMenu } from "../../../services/menuService"

const ArchivedMenuPage = () => {
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const data = await getArchivedMenus();
      setMenus(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleRestore = async (id) => {
    if (!window.confirm("Restore menu ini?")) return;

    try {
      await activateMenu(id);
      fetchMenus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Archived Menu</h1>

      <MenuList
        menus={menus}
        onRestore={handleRestore}
        mode="archived"
      />
    </div>
  );
};

export default ArchivedMenuPage;

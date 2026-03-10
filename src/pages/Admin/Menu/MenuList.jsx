const MenuList = ({ menus, onEdit, onDelete, onRestore, mode = "active" }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number || 0);
  };

  const capitalize = (text) => {
    if (!text) return "";
    return text
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const generateTitle = (menu) => {
    if (menu.carb_manual) return capitalize(menu.carb_manual);
    if (menu.protein) return capitalize(menu.protein);
    if (menu.carb_template?.length > 0)
      return capitalize(menu.carb_template[0].nama);

    return "Menu Tanpa Nama";
  };

  const mealBadgeColor = (meal) => {
    switch (meal) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-700";
      case "lunch":
        return "bg-green-100 text-green-700";
      case "dinner":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="bg-white shadow rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition"
        >
          {/* HEADER */}
          <div className="mb-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${mealBadgeColor(
                menu.meal_type
              )}`}
            >
              {menu.meal_type?.toUpperCase()}
            </span>

            <h2 className="text-lg font-bold mt-2">
              {generateTitle(menu)}
            </h2>
          </div>

          {/* CONTENT */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Protein :</span>{" "}
              {menu.protein || "-"}
            </p>

            <p>
              <span className="font-semibold">Sayuran :</span>{" "}
              {menu.veggie || "-"}
            </p>

            <div>
              <p className="font-semibold">Karbohidrat :</p>

              {menu.carb_manual ? (
                <p className="ml-2">• {menu.carb_manual} (Manual)</p>
              ) : menu.carb_template?.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {menu.carb_template.map((carb) => (
                    <li key={carb._id}>{carb.nama}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-2">-</p>
              )}
            </div>

            <div>
              <p className="font-semibold">Extra :</p>

              {menu.extra?.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {menu.extra.map((ex, idx) => (
                    <li key={idx}>
                      {ex}
                      {menu.harga_extra
                        ? ` (+Rp ${formatRupiah(menu.harga_extra)})`
                        : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-2">-</p>
              )}
            </div>

            <p>
              <span className="font-semibold">Hari :</span>{" "}
              {menu.hari_tersedia?.join(", ") || "-"}
            </p>

            <p className="text-base font-bold text-green-600">
              Rp {formatRupiah(menu.harga_final)}
            </p>
          </div>

          {/* ACTION */}
          <div className="flex gap-2 mt-4">
            {mode === "active" ? (
              <>
                <button
                  onClick={() => onEdit(menu)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-sm py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(menu._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
                >
                  Hapus
                </button>
              </>
            ) : (
              <button
                onClick={() => onRestore(menu._id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded"
              >
                Restore
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;

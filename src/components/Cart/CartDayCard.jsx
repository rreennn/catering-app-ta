import { Trash2 } from "lucide-react";

const CartDayCard = ({
  date,
  items,
  checked,
  onToggleCheck,
  onRemoveItem,
}) => {

  const formatDate = (dateObj) => {
    return new Date(dateObj).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalHari = items.reduce(
    (sum, item) => sum + item.harga_item,
    0
  );

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggleCheck(new Date(date).toDateString())}
          />

          <h3 className="font-semibold">
            {formatDate(date)}
          </h3>
        </div>

        <div className="font-medium">
          Total: Rp {totalHari.toLocaleString("id-ID")}
        </div>
      </div>

      {/* ITEMS */}
      <div className="space-y-3">
        {items.map((item) => {

          const mealTypeLabel =
            item.menu?.meal_type?.charAt(0).toUpperCase() +
            item.menu?.meal_type?.slice(1);

          const carbLabel =
            item.carb_dipilih?.nama ||
            item.carb_manual_snapshot ||
            null;

          const menuName = [
            item.menu?.protein,
            item.menu?.veggie,
          ]
            .filter(Boolean)
            .join(" & ");

          return (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded p-3"
            >

              <div>
                <p className="text-xs text-gray-400">
                  For {mealTypeLabel}
                </p>

                {menuName && (
                  <p className="font-medium">
                    {menuName}
                  </p>
                )}

                {carbLabel && (
                  <p className="text-sm text-gray-500">
                    Karbo: {carbLabel}
                  </p>
                )}

                {item.extra && (
                  <p className="text-sm text-gray-500">
                    Extra: {item.extra.nama}
                  </p>
                )}

                <p className="text-sm font-medium mt-1">
                  Rp {item.harga_item.toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={() => onRemoveItem(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartDayCard;

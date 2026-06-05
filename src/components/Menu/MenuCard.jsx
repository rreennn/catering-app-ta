import { useState, useEffect } from "react";

const MenuCard = ({ menu, onChange, cartItem, disabled }) => {
  const [selectedCarb, setSelectedCarb] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [qty, setQty] = useState(1);

  const handleCarbChange = (carb) => {
    setSelectedCarb(carb);
  };

  const toggleExtra = (extraName) => {
    setSelectedExtras((prev) =>
      prev.includes(extraName)
        ? prev.filter((e) => e !== extraName)
        : [...prev, extraName],
    );
  };

  useEffect(() => {
    if (!selectedCarb) return;

    const totalExtraHarga = selectedExtras.length * (menu.harga_extra || 0);

    // kirim extras sebagai string array, bukan object
    onChange({
      menuId: menu._id,
      meal_type: menu.meal_type,
      carb: selectedCarb,
      extras: selectedExtras,
      qty,
      harga_final: menu.harga_final,
      harga_extra: totalExtraHarga,
    });
  }, [selectedCarb, selectedExtras, qty, menu]);

  useEffect(() => {
    if (!cartItem) {
      setSelectedCarb(null);
      setSelectedExtras([]);
      setQty(1);
      return;
    }

    setSelectedCarb(cartItem.carb);
    setSelectedExtras(cartItem.extras || []);
    setQty(cartItem.qty || 1);
  }, [cartItem]);

  const renderCarbOptions = () => {
    if (menu.carb_template?.length > 0) {
      return menu.carb_template.map((carb) => (
        <label key={carb._id} className="flex gap-2 items-center">
          <input
            type="radio"
            name={`carb-${menu._id}`}
            checked={selectedCarb?._id === carb._id}
            onChange={() => handleCarbChange(carb)}
          />
          {carb.nama}
        </label>
      ));
    }

    if (menu.carb_manual) {
      return (
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            name={`carb-${menu._id}`}
            checked={selectedCarb === menu.carb_manual}
            onChange={() => handleCarbChange(menu.carb_manual)}
          />
          {menu.carb_manual}
        </label>
      );
    }

    return <p className="text-sm text-gray-400">Tidak ada pilihan carb</p>;
  };

  return (
    <div
      className={`border rounded-xl p-4 shadow-sm space-y-3 bg-white ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div>
        {menu.protein && <p className="font-bold">Protein: {menu.protein}</p>}
        {menu.veggie && <p className="font-bold">Sayur: {menu.veggie}</p>}
      </div>

      <div>
        <p className="font-medium">Pilih Karbohidrat *</p>
        <div className="space-y-1">{renderCarbOptions()}</div>
      </div>

      {menu.extra?.length > 0 && (
        <div>
          <p className="font-medium">
            Extra {menu.harga_extra ? `( +Rp ${menu.harga_extra} )` : ""}
          </p>
          <div className="space-y-1">
            {menu.extra.map((extraName) => (
              <label key={extraName} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extraName)}
                  onChange={() => toggleExtra(extraName)}
                />
                {extraName}{" "}
                {menu.harga_extra ? `( +Rp ${menu.harga_extra} )` : ""}
              </label>
            ))}
          </div>
        </div>
      )}

      <p className="font-semibold">Rp {menu.harga_final.toLocaleString()}</p>
      <button className="hover:underline hover:text-red-500 duration-150"
        onClick={() => onChange({ menuId: menu._id, clear: true })}
      >
        Batalkan
      </button>
    </div>
  );
};

export default MenuCard;

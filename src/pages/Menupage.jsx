import { useEffect, useState } from "react";
import MenuCard from "../components/Menu/MenuCard";
import { getMenus } from "../services/menuService";
import { addItemToCart, getOrCreateCart } from "../services/cartService";
import { checkoutGuest } from "../services/orderService";
import Loading from "../components/Loading";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MEAL_TYPE_LABEL = {
  breakfast: "Sarapan (08.00 WIB)",
  lunch: "Makan Siang (12.00 WIB)",
  dinner: "Makan Malam (18.00 WIB)",
};

const Menupage = () => {
  const [menus, setMenus] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Senin");
  const [cart, setCart] = useState({});
  const [guestForm, setGuestForm] = useState({
    nama_penerima: "",
    no_penerima: "",
    alamat_pengiriman: "",
  });
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const dayMap = {
    Minggu: 0,
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
  };

  const isDayDisabled = (day) => {
    const now = new Date();
    const today = now.getDay();
    const currentHour = now.getHours();
    const targetDay = dayMap[day];
    let diff = targetDay - today;

    if (today === 6 && currentHour >= 15) return true;
    if (diff < 0) return true;
    return false;
  };

  const isMenuDisabled = (menu, selectedDay) => {
    const now = new Date();
    const today = now.getDay();
    const currentHour = now.getHours();
    const targetDay = dayMap[selectedDay];
    if (targetDay === undefined) return true;

    let diff = targetDay - today;
    if (today === 0) diff = 7 + targetDay - today;
    if (today === 6 && currentHour >= 10) diff = 7 + targetDay - today;
    if (diff < 0) return true;

    const cutoffHours = { breakfast: 5, lunch: 10, dinner: 15 };
    const cutoff = cutoffHours[menu.meal_type];
    if (cutoff !== undefined && diff === 0 && currentHour >= cutoff)
      return true;

    return false;
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const data = await getMenus();
      setMenus(data.filter((m) => m.is_active));
    } catch (err) {
      console.error("Fetch menu error:", err);
    } finally {
      setLoading(false);
    }
  };

  const menusByDay = menus.filter((menu) =>
    menu.hari_tersedia.includes(selectedDay),
  );
  const groupedMenus = {
    breakfast: menusByDay.filter((m) => m.meal_type === "breakfast"),
    lunch: menusByDay.filter((m) => m.meal_type === "lunch"),
    dinner: menusByDay.filter((m) => m.meal_type === "dinner"),
  };

  // === fix cart key supaya unik per meal + hari ===
  const handleSelection = (data) => {
    if (data.clear) {
      setCart((prev) => {
        const newCart = { ...prev };
        Object.keys(newCart).forEach((key) => {
          if (key.startsWith(data.meal_type + "_")) delete newCart[key];
        });
        return newCart;
      });
      return;
    }

    const itemKey = `${data.meal_type}_${selectedDay}`;
    setCart((prev) => ({
      ...prev,
      [itemKey]: { ...data, hari: selectedDay },
    }));
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => {
      const base = item.harga_final * item.qty;
      const extra = item.harga_extra * item.qty;
      return total + base + extra;
    }, 0);
  };

  const clearMeal = (mealType, day) => {
    const itemKey = `${mealType}_${day}`;
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[itemKey];
      return newCart;
    });
  };

  const handleAddToCart = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth?.token) {
      alert("Harap login terlebih dahulu");
      return;
    }

    try {
      const cartData = await getOrCreateCart();
      const promises = Object.values(cart).map((item) => {
        const menuId = item.menuId;
        let carbDipilih = item.carb?._id || item.carb || null;
        let extra = item.extras?.length > 0 ? item.extras[0] : null;
        const payload = {
          menu: menuId,
          carb_dipilih: carbDipilih,
          extra,
          hari_dipilih: item.hari,
        };
        return addItemToCart(payload);
      });

      const results = await Promise.allSettled(promises);
      results.forEach((res, i) => {
        if (res.status === "fulfilled")
          console.log(`Item ${i} berhasil`, res.value);
        else console.error(`Item ${i} gagal`, res.reason);
      });

      alert("Proses selesai. Lihat console untuk detail hasil setiap item.");
      setCart({});
    } catch (err) {
      console.error("Error handleAddToCart:", err.response?.data || err);
      alert(err.response?.data?.message || "Gagal menambahkan ke cart");
    }
  };

  const handleOrder = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) await handleAddToCart();
    else setShowGuestModal(true);
  };

  const handleGuestCheckout = async () => {
    try {
      const itemsPayload = Object.values(cart).map((item) => {
        let carbDipilih = item.carb?._id || null;
        let carbManual = typeof item.carb === "string" ? item.carb : null;
        let extraObj =
          item.extras?.length > 0
            ? { nama: item.extras[0], harga: item.harga_extra }
            : null;
        return {
          menu: item.menuId,
          carb_dipilih: carbDipilih,
          carb_manual_snapshot: carbManual,
          extra: extraObj,
          hari: item.hari,
          harga_item: item.harga_final + item.harga_extra,
          qty: item.qty || 1,
        };
      });

      const res = await checkoutGuest({ ...guestForm, items: itemsPayload });
      window.snap.pay(res.snapToken);
    } catch (err) {
      console.error("Guest checkout error:", err.response?.data || err);
    }
  };

  return (
    <section className="pt-48 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-display md:text-4xl font-bold text-gray-800 mb-1">
        Pilih Menu
      </h1>
      <p className=" text-gray-700 mt-2">Catatan: Maksimal pesan Sarapan (05.00 WIB), Makan Siang (09.00 WIB), Makan Malam (15.00 WIB). Waktu pengantaran tertera di atas menu</p>
      <p className=" text-gray-700 mb-4">Waktu pengantaran tertera di atas menu</p>
      <div className="flex gap-2 flex-wrap mb-8">
        {DAYS.map((day) => {
          const disabled = isDayDisabled(day);
          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => !disabled && setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg border transition text-sm md:text-base ${
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selectedDay === day
                    ? "bg-meat-600 text-white border-meat-600"
                    : "bg-white hover:bg-orange-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <Loading />
          ) : (
            Object.entries(groupedMenus).map(([mealType, list]) => {
              if (list.length === 0) return null;
              return (
                <div key={mealType} className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
                    {MEAL_TYPE_LABEL[mealType] || mealType}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {list.map((menu) => (
                      <MenuCard
                        key={menu._id}
                        menu={menu}
                        cartItem={cart[`${menu.meal_type}_${selectedDay}`]}
                        onChange={handleSelection}
                        disabled={isMenuDisabled(menu, selectedDay)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-28">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
            Ringkasan Pesanan
          </h2>

          {Object.keys(cart).length === 0 && (
            <p className="text-gray-500 text-sm">Belum ada menu dipilih</p>
          )}

          {Object.values(cart).map((item) => (
            <div
              key={`${item.meal_type}_${item.hari}`}
              className="mb-4 text-sm border-b pb-3"
            >
              <p className="font-medium capitalize">
                {MEAL_TYPE_LABEL[item.meal_type] || item.meal_type}
              </p>
              <p className="text-medium text-gray-500">Hari: {item.hari}</p>
              <p className="text-gray-600">
                Karbohidrat: {item.carb?.nama || item.carb}
              </p>
              {item.extras?.length > 0 && (
                <p className="text-gray-600">Extra: {item.extras.join(", ")}</p>
              )}
              <button
                onClick={() => clearMeal(item.meal_type, item.hari)}
                className="text-red-500 text-xs mt-1 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}

          {Object.keys(cart).length > 0 && (
            <>
              <p className="font-bold text-gray-800 mt-4">
                Total: Rp {getTotalPrice().toLocaleString()}
              </p>
              <button
                onClick={handleOrder}
                className="w-full mt-4 bg-meat-600 text-white py-2 rounded-lg hover:bg-meat-700 transition"
              >
                Pesan Sekarang
              </button>
            </>
          )}
        </div>
      </div>

      {showGuestModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Data Pengiriman
            </h3>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Nama"
              value={guestForm.nama_penerima}
              onChange={(e) =>
                setGuestForm({ ...guestForm, nama_penerima: e.target.value })
              }
            />
            <input
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="No HP"
              value={guestForm.no_penerima}
              onChange={(e) =>
                setGuestForm({ ...guestForm, no_penerima: e.target.value })
              }
            />
            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Alamat"
              value={guestForm.alamat_pengiriman}
              onChange={(e) =>
                setGuestForm({
                  ...guestForm,
                  alamat_pengiriman: e.target.value,
                })
              }
            />
            <button
              onClick={handleGuestCheckout}
              className="w-full bg-meat-600 text-white py-2 rounded-lg hover:bg-meat-700 transition"
            >
              Bayar Sekarang
            </button>
            <button
              onClick={() => setShowGuestModal(false)}
              className="w-full text-gray-500 text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menupage;

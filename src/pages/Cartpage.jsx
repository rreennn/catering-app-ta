import { useEffect, useState } from "react";
import {
  getMyCart,
  removeItemFromCart,
  getOrCreateCart,
} from "../services/cartService";
import { checkoutCart } from "../services/orderService";
import CartDayCard from "../components/Cart/CartDayCard";
import groupCartByDate from "../helpers/groupCartbyDate";

const Cartpage = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth?.token) {
    return <p>Silakan login untuk melihat keranjang</p>;
  }
  const [cart, setCart] = useState(null);
  const [groupedCart, setGroupedCart] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [form, setForm] = useState({
    nama_penerima: "",
    no_penerima: "",
    alamat_pengiriman: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      await getOrCreateCart();
      const data = await getMyCart();

      setCart(data);
      setGroupedCart(groupCartByDate(data.items));

      // reset checked
      const initialChecked = {};
      data.items.forEach((item) => {
        initialChecked[item._id] = false;
      });

      setCheckedItems(initialChecked);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleToggleDay = (tanggal, items) => {
    const allChecked = items.every((i) => checkedItems[i._id]);

    const updated = { ...checkedItems };

    items.forEach((item) => {
      updated[item._id] = !allChecked;
    });

    setCheckedItems(updated);
  };

  const isDayChecked = (items) => {
    return items.every((i) => checkedItems[i._id]);
  };

  const handleCheckAll = () => {
    const allChecked = Object.values(checkedItems).every(Boolean);

    const updated = {};
    Object.keys(checkedItems).forEach((id) => {
      updated[id] = !allChecked;
    });

    setCheckedItems(updated);
  };

  // ================= REMOVE ITEM =================
  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await removeItemFromCart(itemId);
      setCart(updatedCart);
      setGroupedCart(groupCartByDate(updatedCart.items));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= TOTAL =================
  const getTotalHarga = () => {
    if (!cart?.items) return 0;

    return cart.items
      .filter((item) => checkedItems[item._id])
      .reduce((t, i) => t + i.harga_item, 0);
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 pt-50">
        <h1 className="text-xl font-bold">Keranjang Kosong</h1>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const selectedItems = cart.items
        .filter((item) => checkedItems[item._id])
        .map((item) => item._id);

      if (selectedItems.length === 0) {
        return alert("Pilih minimal 1 menu");
      }

      const result = await checkoutCart({
        ...form,
        selectedItems,
      });

      const snapToken = result.snapToken;

      if (!window.snap) {
        alert("Snap Midtrans belum ter-load");
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          const orderId = result.order_id;
          window.location.href = `/payment-success/${orderId}`;
        },

        onPending: function () {
          alert("Menunggu pembayaran");
        },

        onError: function () {
          alert("Pembayaran gagal");
          // 🔥 Cart tetap ada, tidak perlu fetch ulang
        },

        onClose: function () {
          alert("Pembayaran dibatalkan");
          // 🔥 Cart tetap aman
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Checkout gagal");
    }
  };

  return (
    <div className="p-6 space-y-6 pt-50">
      <h1 className="text-2xl font-bold">Keranjang Saya</h1>

      <div className="flex justify-end">
        <button onClick={handleCheckAll} className="text-sm underline">
          Pilih Semua
        </button>
      </div>

      {Object.entries(groupedCart).map(([tanggal, items]) => (
        <CartDayCard
          key={tanggal}
          date={new Date(tanggal)}
          items={items}
          checked={isDayChecked(items)}
          onToggleCheck={() => handleToggleDay(tanggal, items)}
          onRemoveItem={handleRemoveItem}
        />
      ))}

      <div className="border-t pt-4 font-bold text-lg">
        Total: Rp {getTotalHarga().toLocaleString()}
      </div>
      <div className="border-t pt-4 space-y-3">
        <h2 className="text-lg font-semibold">Data Pengiriman</h2>

        <input
          name="nama_penerima"
          placeholder="Nama penerima"
          value={form.nama_penerima}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="no_penerima"
          placeholder="Nomor HP penerima"
          value={form.no_penerima}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="alamat_pengiriman"
          placeholder="Alamat lengkap"
          value={form.alamat_pengiriman}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cartpage;

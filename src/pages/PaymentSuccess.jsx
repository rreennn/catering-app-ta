import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MEAL_TYPE_LABEL = {
  breakfast: "Sarapan",
  lunch: "Makan Siang",
  dinner: "Makan Malam",
};

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // kalau ada ORDER- prefix, hapus
        const cleanId = orderId.replace("ORDER-", "");

        const res = await axios.get(
          `http://localhost:5000/api/orders/public/${cleanId}`,
        );

        setOrder(res.data);
        console.log("Order data:", res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Memuat data pesanan...</p>
      </div>
    );

  return (
    <section className="min-h-screen pt-48 flex items-center justify-center px-4 py-20 bg-lightbg">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Pembayaran Berhasil
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Terima kasih! Pesanan kamu sedang kami proses.
          </p>
        </div>

        {/* ORDER INFO */}
        <div className="space-y-2 text-sm md:text-base mb-6">
          <p>
            <span className="font-medium">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-medium">Nama:</span> {order.nama_penerima}
          </p>
          <p>
            <span className="font-medium">Alamat:</span>{" "}
            {order.alamat_pengiriman}
          </p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detail Pesanan
          </h3>

          {order?.items?.map((item, index) => (
            <div
              key={item._id || index}
              className="border-b pb-4 mb-4 text-sm md:text-base"
            >
              <p className="font-semibold capitalize">
                {MEAL_TYPE_LABEL[item.menu?.meal_type] || item.menu?.meal_type}
              </p>

              <p>
                Tanggal Pengiriman :{" "}
                {new Date(item.tanggal_delivery).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-gray-600 italic">
                {item.carb_dipilih?.nama || item.carb_manual_snapshot}
              </p>

              {item.extra?.nama && (
                <p className="text-gray-600 italic">Extra: {item.extra.nama}</p>
              )}

              <p className="text-gray-600 italic">
                {item.menu?.protein} {item.menu?.veggie}
              </p>

              <p className="text-md font-bold mt-1 font-display">
                Rp {item.harga_item.toLocaleString("id-ID")}
              </p>
            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-between items-center pt-4">
            <span className="font-semibold text-gray-800">
              Total Pembayaran
            </span>
            <span className="font-bold text-lg text-meat-600">
              Rp {order.total_harga?.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;

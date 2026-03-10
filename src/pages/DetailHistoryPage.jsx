import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../services/orderService";

const DetailHistoryPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fetchDetail = async () => {
    try {
      const data = await getOrderDetail(id);
      setOrder(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (!order) return <p className="p-6 pt-40">Loading...</p>;

  return (
    <div className="p-6 pt-45 space-y-6">
      <h1 className="text-2xl font-bold">Detail Pesanan</h1>

      {/* ===== INFO ORDER ===== */}
      <div className="border p-4 rounded-lg space-y-2 bg-white">
        <p>Total: Rp {order.total_harga.toLocaleString("id-ID")}</p>
        <p>Status Order: {order.status_order}</p>
        <p>Status Pembayaran: {order.status_pembayaran}</p>
      </div>

      {/* ===== ITEMS ===== */}
      <div className="space-y-4 ">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="border-gray-100 rounded-md shadow-md p-3 bg-white"
          >
            <p className="font-semibold">
              {item.menu?.protein} & {item.menu?.veggie}
            </p>

            {/* carb template */}
            {item.carb_dipilih && (
              <p className="text-sm text-gray-500">
                Karbo: {item.carb_dipilih?.nama}
              </p>
            )}

            {/* carb manual */}
            {item.carb_manual_snapshot && (
              <p className="text-sm text-gray-500">
                Karbo: {item.carb_manual_snapshot}
              </p>
            )}

            {item.extra && (
              <p className="text-sm text-gray-500">
                Extra: {item.extra.nama}
              </p>
            )}

            <p className="text-sm">
              Delivery: {formatDate(item.tanggal_delivery)}
            </p>

            <p className="font-medium">
              Rp {item.harga_item.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailHistoryPage;

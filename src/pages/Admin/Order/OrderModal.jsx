import dayjs from "dayjs";
import { updateOrderStatus } from "../../../services/adminOrderService";
import { useState } from "react";

const OrderModal = ({ order, onClose, onUpdated }) => {
  const [statusOrder, setStatusOrder] = useState(order.status_order);
  const [statusPembayaran, setStatusPembayaran] = useState(
    order.status_pembayaran
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateOrderStatus(order._id, {
        status_order: statusOrder,
        status_pembayaran: statusPembayaran,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-175 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Detail Order</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Info Customer */}
        <div className="mb-4">
          <p><b>Penerima:</b> {order.nama_penerima}</p>
          <p><b>No HP:</b> {order.no_penerima}</p>
          <p><b>Alamat:</b> {order.alamat_pengiriman}</p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items</h3>

          {order.items.map((item) => (
            <div key={item._id} className="border p-3 mb-2 rounded">

              <p><b>Menu:</b> {item.menu?.protein || item.carb_manual_snapshot} {item.menu?.veggie || ""}</p>

              <p className="capitalize italic">{item.menu?.meal_type}</p>

              <p>
                <b>Karbohidrat:</b>{" "}
                {item.carb_dipilih?.nama || item.carb_manual_snapshot ||"Default"}
              </p>

              {item.extra?.nama && (
                <p>
                  <b>Extra:</b> {item.extra.nama} (+Rp {item.extra.harga})
                </p>
              )}

              <p>
                <b>Delivery:</b>{" "}
                {dayjs(item.tanggal_delivery).format("DD MMM YYYY")}
              </p>

              <p>
                <b>Harga Item:</b> Rp {item.harga_item}
              </p>
            </div>
          ))}
        </div>

        {/* Status Controls */}
        <div className="mb-4 space-y-3">

          <div>
            <label className="block font-semibold">Status Order</label>
            <select
              value={statusOrder}
              onChange={(e) => setStatusOrder(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="diproses">Diproses</option>
              <option value="dimasak">Dimasak</option>
              <option value="dikirim">Dikirim</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Status Pembayaran</label>
            <select
              value={statusPembayaran}
              onChange={(e) => setStatusPembayaran(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Batal
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

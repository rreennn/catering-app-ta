import { useEffect, useMemo, useState } from "react";
import { getAllOrders } from "../../../services/adminOrderService";
import OrderModal from "./OrderModal";
import dayjs from "dayjs";
import { exportMonthlyOrdersExcel } from "../../../helpers/excelHelpers";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getAllOrders(pageNumber);
      setOrders(data.orders);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const flattenedItems = useMemo(() => {
    return orders.flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        orderRef: order,
      })),
    );
  }, [orders]);

  const todayGrouped = useMemo(() => {
    if (!selectedDate) return {};

    const grouped = {};

    flattenedItems.forEach((item) => {
      if (!dayjs(item.tanggal_delivery).isSame(selectedDate, "day")) return;

      const meal = item.menu?.meal_type || "lainnya";

      if (!grouped[meal]) grouped[meal] = [];

      grouped[meal].push(item);
    });

    return grouped;
  }, [flattenedItems, selectedDate]);

  const monthlyOrders = useMemo(() => {
    return orders.filter(
      (order) => dayjs(order.createdAt).format("YYYY-MM") === selectedMonth,
    );
  }, [orders, selectedMonth]);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Order Management</h1>
      <div>
        <h2 className="text-xl font-semibold mb-3">Order Harian</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 mb-4"
        />

        {Object.keys(todayGrouped).length === 0 && (
          <p>Tidak ada order pada tanggal ini.</p>
        )}

        {Object.entries(todayGrouped).map(([mealType, items]) => (
          <div key={mealType} className="mb-6">
            <h3 className="font-bold capitalize mb-2">{mealType}</h3>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Customer</th>
                  <th className="p-2">Packing</th>
                  <th className="p-2">Delivery</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={`${item.orderRef._id}-${item._id}`}
                    className="border-t"
                  >
                    <td className="p-2">{item.orderRef.nama_penerima}</td>

                    <td className="p-2">
                      {item.carb_dipilih?.nama ||
                        item.carb_manual_snapshot ||
                        "-"}{" "}
                      & {item.menu?.extra || "-"}
                    </td>

                    <td className="p-2">
                      {dayjs(item.tanggal_delivery).format("DD MMM YYYY")}
                    </td>

                    <td className="p-2">{item.orderRef.status_order}</td>

                    <td className="p-2">
                      <button
                        onClick={() => setSelectedOrder(item.orderRef)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Order Bulanan</h2>
        <div className="">
          <button
            onClick={() =>
              exportMonthlyOrdersExcel(monthlyOrders, selectedMonth)
            }
            className="bg-green-600 text-white px-4 py-2 rounded mx-2"
          >
            Export Excel
          </button>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 mb-4"
          />
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Tanggal Order</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Total Harga</th>
              <th className="p-2">Pembayaran</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {monthlyOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">
                  {dayjs(order.createdAt).format("DD MMM YYYY")}
                </td>

                <td className="p-2">{order.nama_penerima}</td>

                <td className="p-2">Rp {order.total_harga}</td>

                <td className="p-2">{order.status_pembayaran}</td>

                <td className="p-2">{order.status_order}</td>

                <td className="p-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={fetchOrders}
        />
      )}
    </div>
  );
};

export default OrderManagement;

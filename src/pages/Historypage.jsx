import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import HistoryCard from "../components/Order/HistoryCard";
import Loading from "../components/Loading";

const Historypage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth?.token) {
    return (
      <h3 className="p-6 pt-50 font-bold text-2xl">
        Silakan login untuk melihat riwayat pesanan
      </h3>
    );
  }

  const fetchOrders = async (pageNumber = 1) => {
    try {
      const data = await getMyOrders(pageNumber);
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

  return (
    <div className="p-6 space-y-4 pt-45">
      <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="font-bold text-2xl">Belum ada riwayat pesanan</p>
      ) : (
        orders.map((order) => <HistoryCard key={order._id} order={order} />)
      )}
      <div className="flex gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-2">
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
  );
};

export default Historypage;

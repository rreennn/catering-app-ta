import { useNavigate } from "react-router-dom";

const HistoryCard = ({ order }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="border-gray-50 rounded-lg p-4 shadow-sm flex justify-between items-center bg-white">
      <div>
        <p className="text-sm text-gray-500">
          {formatDate(order.createdAt)}
        </p>

        <p className="font-semibold">
          Rp {order.total_harga.toLocaleString("id-ID")}
        </p>

        <p className="text-sm">
          Status Order:{" "}
          <span className="font-medium">
            {order.status_order}
          </span>
        </p>

        <p className="text-sm">
          Status Pembayaran:{" "}
          <span className="font-medium">
            {order.status_pembayaran}
          </span>
        </p>
      </div>

      <button
        onClick={() => navigate(`/history/${order._id}`)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Detail
      </button>
    </div>
  );
};

export default HistoryCard;

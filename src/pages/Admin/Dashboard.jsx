import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getKitchenSummary,
  getOrderStatusSummary,
} from "../../services/adminDashboardService";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [kitchen, setKitchen] = useState({
    protein: {},
    carb: {},
    veggie: {},
    extra: {},
  });
  const [orderStatus, setOrderStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryData, kitchenData, orderStatusData] = await Promise.all([
          getDashboardSummary(selectedDate),
          getKitchenSummary(selectedDate),
          getOrderStatusSummary(),
        ]);

        setSummary(summaryData);
        setKitchen(kitchenData);
        setOrderStatus(orderStatusData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedDate]);
  const renderCategory = (data) => {
    if (!data || Object.keys(data).length === 0) {
      return <p className="text-gray-400">Tidak ada data</p>;
    }

    return Object.entries(data).map(([name, total]) => (
      <p key={name}>
        {name}: {total}
      </p>
    ));
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold my-4 font-display">Admin Dashboard</h1>
      <div className="mb-6 bg-white w-72 shadow-md p-2 rounded-md">
        <label className="mr-2 font-medium">Pilih Tanggal:</label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>
      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <p>Total Order</p>
          <h2 className="text-xl font-bold">{summary.total_order}</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p>Total Item</p>
          <h2 className="text-xl font-bold">{summary.total_item}</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p>Total Pendapatan</p>
          <h2 className="text-xl font-bold">Rp {summary.total_pendapatan}</h2>
        </div>
      </div>

      {/* KITCHEN */}
      <div className="p-4 bg-white shadow rounded mb-6">
        <h2 className="font-semibold mb-4">Rekap Dapur</h2>
        <div className="flex justify-between">
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <div key={meal} className="mb-6 p-4 w-90 rounded-md text-white bg-gray-800">
              <h3 className="font-bold capitalize mb-3 text-xl">{meal}</h3>
              <p className="text-gray-300 mb-2">
                Total Menu: {kitchen?.[meal]?.total_menu || 0}
              </p>

              <div className="pb-3">
                <h4 className="font-medium text-lg underline">Protein</h4>
                {renderCategory(kitchen?.[meal]?.protein)}
              </div>

              <div className="pb-3">
                <h4 className="font-medium text-lg underline">Sayuran</h4>
                {renderCategory(kitchen?.[meal]?.veggie)}
              </div>

              <div className="pb-3">
                <h4 className="font-medium text-lg underline">Karbohidrat</h4>
                {renderCategory(kitchen?.[meal]?.carb)}
              </div>

              <div className="pb-3">
                <h4 className="font-medium text-lg underline">Extra</h4>
                {renderCategory(kitchen?.[meal]?.extra)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ORDER STATUS */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="font-semibold mb-2">Order Status</h2>

        {Object.entries(orderStatus).map(([status, total]) => (
          <p key={status}>
            {status}: {total}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

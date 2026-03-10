import API from "./api";

export const getDashboardSummary = async (date) => {
  const res = await API.get(`/admin/dashboard/summary?date=${date}`);
  return res.data;
};

export const getKitchenSummary = async (date) => {
  const res = await API.get(`/admin/dashboard/kitchen?date=${date}`);
  return res.data;
};

export const getOrderStatusSummary = async () => {
  const res = await API.get("/admin/dashboard/order-status");
  return res.data;
};

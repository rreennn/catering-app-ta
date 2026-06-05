// services/adminOrderService.js
import API from "./api";

export const getAllOrders = async (page = 1, month = "") => {
  const res = await API.get(
    `/admin/orders?page=${page}&limit=10&month=${month}`,
  );
  return res.data;
};

export const updateOrderStatus = async (id, payload) => {
  const res = await API.patch(`/admin/orders/${id}/status`, payload);
  return res.data;
};

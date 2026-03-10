import API from "./api";

export const checkoutCart = async (payload) => {
  const res = await API.post("/orders/checkout", payload);
  return res.data;
};

export const getMyOrders = async (page = 1) => {
  const res = await API.get(`/orders?page=${page}&limit=5`);
  return res.data;
};

export const getOrderDetail = async (orderId) => {
  const res = await API.get(`/orders/${orderId}`);
  return res.data;
};

export const createPayment = async (orderId) => {
  const res = await API.post(`/orders/payment/${orderId}`);
  return res.data;
};

export const checkoutGuest = async (payload) => {
  const res = await API.post("/orders/guest-checkout", payload);
  return res.data;
};


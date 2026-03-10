import API from "./api";

// Ambil cart user (sudah include populate backend)
export const getMyCart = async () => {
  const res = await API.get("/cart/me");
  return res.data;
};

// Optional → memastikan cart exist
export const getOrCreateCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Tambah item ke cart
export const addItemToCart = async (payload) => {
  const res = await API.post("/cart/item", payload);
  return res.data;
};

// Hapus item dari cart
export const removeItemFromCart = async (itemId) => {
  const res = await API.delete(`/cart/item/${itemId}`);
  return res.data;
};

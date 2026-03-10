import API from "./api";

/* ================= MENU ================= */

export const getMenus = async () => {
  const res = await API.get("/menu");
  return res.data;
};

export const getMenuById = async (id) => {
  const res = await API.get(`/menu/${id}`);
  return res.data;
};

export const createMenu = async (payload) => {
  const res = await API.post("/menu", payload);
  return res.data;
};

export const updateMenu = async (id, payload) => {
  const res = await API.put(`/menu/${id}`, payload);
  return res.data;
};

export const deleteMenu = async (id) => {
  const res = await API.delete(`/menu/${id}`);
  return res.data;
};

export const getArchivedMenus = async () => {
  const res = await API.get('/menu/archived');
  return res.data;
};

export const activateMenu = async (id) => {
  const res = await API.put(`/menu/${id}/activate`);
  return res.data;
};

/* ================= CARB TEMPLATE ================= */

export const getCarbTemplates = async () => {
  const res = await API.get("/carb");
  return res.data;
};

export const createCarbTemplate = async (payload) => {
  const res = await API.post("/carb", payload);
  return res.data;
};

export const sanitizeMenuPayload = (data, carbMode) => {
  if (carbMode === "template") {
    return {
      ...data,
      carb_manual: "",
    };
  }

  if (carbMode === "manual") {
    return {
      ...data,
      carb_template: [],
    };
  }

  return data;
};

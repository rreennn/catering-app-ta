import API from "./api";

/* ===== GET ===== */
export const getCarbTemplates = async () => {
  const res = await API.get("/carb");
  return res.data;
};

export const getArchivedCarbTemplates = async () => {
  const res = await API.get("/carb/archived");
  return res.data;
};

/* ===== CREATE ===== */
export const createCarbTemplate = async (payload) => {
  const res = await API.post("/carb", payload);
  return res.data;
};

/* ===== UPDATE ===== */
export const updateCarbTemplate = async (id, payload) => {
  const res = await API.put(`/carb/${id}`, payload);
  return res.data;
};

/* ===== DELETE ===== */
export const deleteCarbTemplate = async (id) => {
  const res = await API.delete(`/carb/${id}`);
  return res.data;
};

/* ===== ACTIVATE ===== */
export const activateCarbTemplate = async (id) => {
  const res = await API.put(`/carb/${id}/activate`);
  return res.data;
};

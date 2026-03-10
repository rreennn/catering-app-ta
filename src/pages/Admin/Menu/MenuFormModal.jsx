import { useEffect, useState } from "react";

const hariList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];

const MenuFormModal = ({ menu, carbTemplates, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    meal_type: "breakfast",
    protein: "",
    veggie: "",
    carb_template: [],
    carb_manual: "",
    extra: [],
    harga_final: "",
    harga_extra: "",
    hari_tersedia: [],
  });

  const [carbMode, setCarbMode] = useState("template");
  const extraValue = form.extra?.[0] || "";

  useEffect(() => {
    if (menu) {
      setForm(menu);

      if (menu.carb_manual) {
        setCarbMode("manual");
      }
    }
  }, [menu]);

  /* ================= HANDLER ================= */

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleHari = (hari) => {
    const exists = form.hari_tersedia.includes(hari);

    if (exists) {
      handleChange(
        "hari_tersedia",
        form.hari_tersedia.filter((h) => h !== hari),
      );
    } else {
      handleChange("hari_tersedia", [...form.hari_tersedia, hari]);
    }
  };

  const toggleCarbTemplate = (id) => {
    const exists = form.carb_template.includes(id);

    if (exists) {
      handleChange(
        "carb_template",
        form.carb_template.filter((c) => c !== id),
      );
    } else {
      handleChange("carb_template", [...form.carb_template, id]);
    }
  };

  const handleSubmit = () => {
    const payload = { ...form };

    if (carbMode === "template") {
      payload.carb_manual = "";
    } else {
      payload.carb_template = [];
    }

    onSubmit(payload, menu?._id);
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-125">
        <h2 className="text-xl mb-4">{menu ? "Edit Menu" : "Tambah Menu"}</h2>

        {/* Meal */}
        <select
          value={form.meal_type}
          onChange={(e) => handleChange("meal_type", e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        {/* Protein */}
        <input
          placeholder="Protein"
          value={form.protein}
          onChange={(e) => handleChange("protein", e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {/* Veggie */}
        <input
          placeholder="Veggie"
          value={form.veggie}
          onChange={(e) => handleChange("veggie", e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {/* Carb Mode */}
        <div className="mb-3">
          <label>
            <input
              type="radio"
              checked={carbMode === "template"}
              onChange={() => setCarbMode("template")}
            />
            Carb Template
          </label>

          <label className="ml-4">
            <input
              type="radio"
              checked={carbMode === "manual"}
              onChange={() => setCarbMode("manual")}
            />
            Carb Manual
          </label>
        </div>

        {/* Carb Template */}
        {carbMode === "template" && (
          <div className="mb-3">
            {carbTemplates.map((c) => (
              <label key={c._id} className="block">
                <input
                  type="checkbox"
                  checked={form.carb_template.includes(c._id)}
                  onChange={() => toggleCarbTemplate(c._id)}
                />
                {c.nama}
              </label>
            ))}
          </div>
        )}

        {/* Carb Manual */}
        {carbMode === "manual" && (
          <input
            placeholder="Carb Manual"
            value={form.carb_manual}
            onChange={(e) => handleChange("carb_manual", e.target.value)}
            className="border p-2 w-full mb-3"
          />
        )}

        {/* Hari */}
        <div className="mb-3">
          {hariList.map((hari) => (
            <label key={hari} className="mr-2">
              <input
                type="checkbox"
                checked={form.hari_tersedia.includes(hari)}
                onChange={() => toggleHari(hari)}
              />
              {hari}
            </label>
          ))}
        </div>

        <input
          placeholder="Nama Extra (contoh: Susu Milo)"
          value={extraValue}
          onChange={(e) =>
            handleChange("extra", e.target.value ? [e.target.value] : [])
          }
          className="border p-2 w-full mb-3"
        />

        {/* Harga */}
        <input
          placeholder="Harga Extra"
          type="number"
          value={form.harga_extra}
          onChange={(e) => handleChange("harga_extra", e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="Harga Final"
          type="number"
          value={form.harga_final}
          onChange={(e) => handleChange("harga_final", e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {/* ACTION */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Batal</button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuFormModal;

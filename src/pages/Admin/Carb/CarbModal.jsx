import { useState, useEffect } from "react";

const CarbModal = ({ carb, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    nama: "",
    default_harga: ""
  });

  useEffect(() => {
    if (carb) {
      setForm({
        nama: carb.nama || "",
        default_harga: carb.default_harga || ""
      });
    }
  }, [carb]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      default_harga: form.default_harga
        ? Number(form.default_harga)
        : undefined
    };

    onSubmit(payload, carb?._id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-4">
          {carb ? "Edit Carb" : "Tambah Carb"}
        </h2>

        <div className="space-y-3">

          <input
            type="text"
            name="nama"
            placeholder="Nama Carb"
            value={form.nama}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="default_harga"
            placeholder="Default Harga (optional)"
            value={form.default_harga}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
};

export default CarbModal;

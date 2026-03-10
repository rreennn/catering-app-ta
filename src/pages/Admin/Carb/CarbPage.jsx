import { useEffect, useState } from "react";
import {
  getCarbTemplates,
  createCarbTemplate,
  updateCarbTemplate,
  deleteCarbTemplate,
  getArchivedCarbTemplates,
  activateCarbTemplate,
} from "../../../services/carbTemplateService";

import CarbList from "./CarbList";
import CarbModal from "./CarbModal";

const CarbPage = () => {
  const [carbs, setCarbs] = useState([]);
  const [archivedCarbs, setArchivedCarbs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCarb, setSelectedCarb] = useState(null);

  /* ===== FETCH ===== */

  const fetchCarbs = async () => {
    try {
      const active = await getCarbTemplates();
      const archived = await getArchivedCarbTemplates();

      setCarbs(active);
      setArchivedCarbs(archived);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCarbs();
      setLoading(false);
    };

    init();
  }, []);

  /* ===== CRUD ===== */

  const handleCreate = () => {
    setSelectedCarb(null);
    setShowModal(true);
  };

  const handleEdit = (carb) => {
    setSelectedCarb(carb);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Arsipkan carb template?")) return;

    await deleteCarbTemplate(id);
    fetchCarbs();
  };

  const handleActivate = async (id) => {
    await activateCarbTemplate(id);
    fetchCarbs();
  };

  const handleSubmit = async (payload, id) => {
    if (id) {
      await updateCarbTemplate(id, payload);
    } else {
      await createCarbTemplate(payload);
    }

    setShowModal(false);
    fetchCarbs();
  };

  if (loading) return <p>Loading carb templates...</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Carb Template</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah Carb
        </button>
      </div>

      <CarbList carbs={carbs} onEdit={handleEdit} onDelete={handleDelete} />

      {archivedCarbs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-500">
            Arsip Carb Template
          </h2>

          <CarbList
            carbs={archivedCarbs}
            onActivate={handleActivate}
            archivedMode
          />
        </div>
      )}
      {showModal && (
        <CarbModal
          carb={selectedCarb}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CarbPage;

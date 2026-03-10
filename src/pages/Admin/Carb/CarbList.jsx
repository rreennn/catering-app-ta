const CarbList = ({
  carbs,
  onEdit,
  onDelete,
  onActivate,
  archivedMode = false,
}) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number || 0);
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Nama</th>
          <th className="p-2">Default Harga</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {carbs.map((carb) => (
          <tr key={carb._id} className="border-t">
            <td className="p-2">{carb.nama}</td>

            <td className="p-2">
              {carb.default_harga
                ? `Rp ${formatRupiah(carb.default_harga)}`
                : "-"}
            </td>

            <td className="p-2 space-x-2">
              {!archivedMode ? (
                <>
                  <button
                    onClick={() => onEdit(carb)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(carb._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Arsipkan
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onActivate(carb._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Aktifkan
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarbList;

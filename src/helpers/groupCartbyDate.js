const groupCartByDate = (items) => {
  const grouped = {};

  items.forEach((item) => {
    const dateKey = new Date(item.tanggal_delivery).toDateString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(item);
  });

  return grouped;
};

export default groupCartByDate;

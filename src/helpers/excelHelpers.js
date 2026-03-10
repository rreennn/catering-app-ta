import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export const exportMonthlyOrdersExcel = (orders, selectedMonth) => {
  if (!orders || orders.length === 0) return;

  /*
    =========================
    📊 Sheet 1 → Rekap Transaksi
    =========================
  */

  const transaksiSheet = orders.map((order, index) => ({
    No: index + 1,
    "Tanggal Order": dayjs(order.createdAt).format("DD-MM-YYYY"),
    Customer: order.nama_penerima,
    "No HP": order.no_penerima,
    "Total Harga": order.total_harga,
    "Status Pembayaran": order.status_pembayaran,
    "Status Order": order.status_order,
  }));

  /*
    =========================
    💰 Summary
    =========================
  */

  const totalTransaksi = orders.length;
  const totalPendapatan = orders.reduce(
    (sum, order) => sum + order.total_harga,
    0
  );

  const summarySheet = [
    { Keterangan: "Bulan", Nilai: selectedMonth },
    { Keterangan: "Total Transaksi", Nilai: totalTransaksi },
    { Keterangan: "Total Pendapatan", Nilai: totalPendapatan },
  ];

  /*
    =========================
    🍱 BONUS → Rekap Menu
    =========================
  */

  const menuSummary = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const protein = item.menu?.protein;
      const veggie = item.menu?.veggie;
      const carb = item.carb_dipilih?.nama;
      const extra = item.extra?.nama;

      const pushCount = (key, value) => {
        if (!value) return;

        if (!menuSummary[key]) menuSummary[key] = {};
        menuSummary[key][value] =
          (menuSummary[key][value] || 0) + 1;
      };

      pushCount("Protein", protein);
      pushCount("Veggie", veggie);
      pushCount("Carb", carb);
      pushCount("Extra", extra);
    });
  });

  const menuSheet = [];

  Object.entries(menuSummary).forEach(([kategori, items]) => {
    Object.entries(items).forEach(([nama, jumlah]) => {
      menuSheet.push({
        Kategori: kategori,
        Item: nama,
        Jumlah: jumlah,
      });
    });
  });

  /*
    =========================
    📄 Create Workbook
    =========================
  */

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(summarySheet),
    "Summary"
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(transaksiSheet),
    "Transaksi"
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(menuSheet),
    "Rekap Menu"
  );

  /*
    =========================
    ⬇️ Download File
    =========================
  */

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, `Rekap_Order_${selectedMonth}.xlsx`);
};

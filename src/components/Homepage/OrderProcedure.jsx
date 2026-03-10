import React from "react";
import { motion } from "framer-motion";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderProcedure() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16">

      {/* ===== Title Section ===== */}
      <div className="max-w-6xl mx-auto text-center mb-12 px-4">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Cara Pemesanan
        </motion.h2>

        <motion.p
          className="text-gray-600 mt-3 text-sm md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Pesan catering harian favoritmu dengan mudah — pilih metode yang
          paling sesuai untuk kebutuhanmu.
        </motion.p>
      </div>

      {/* ===== Cards ===== */}
      <div className="flex justify-center gap-8 md:gap-10 max-w-5xl mx-auto px-4 md:px-6">

        {/* Card 1 */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:-translate-y-1 transition duration-300"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <NotepadText className="text-meat-600" />
            <h3 className="text-xl md:text-2xl font-semibold text-meat-600">
              Pemesanan Manual
            </h3>
          </div>

          <ol className="text-left text-gray-700 mb-6 list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Pilih menu atau paket harian yang kamu inginkan</li>
            <li>Isi form pemesanan dengan detail alamat & jadwal</li>
            <li>Tunggu konfirmasi dari tim kami</li>
            <li>Lakukan pembayaran dan pesanan mulai dikirim</li>
          </ol>

          <Link
            to={"/menu"}
            className="inline-block bg-meat-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-orange-700 text-sm md:text-base"
          >
            Pesan via Form
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
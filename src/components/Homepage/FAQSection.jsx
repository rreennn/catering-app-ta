import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Berapa minimal pesanan catering harian?",
      answer:
        "Minimal satu pesanan untuk sekali pembayaran, pesanan bisa lebih fleksibel",
    },
    {
      question: "Apakah menu bisa diganti setiap hari?",
      answer:
        "Menu kami berbeda setiap hari. Menu akan diperbaharui tiap minggunya",
    },
    {
      question: "Jam berapa makanan dikirim?",
      answer:
        "Pengiriman dilakukan setiap pagi sekitar pukul 09.00 untuk sarapan dan 12.00 untuk makan siang, dan 18.00 untuk makan malam.",
    },
    {
      question: "Kapan menu bisa dipesan?",
      answer:
        "Menu bisa dipesan 3 jam sebelum waktu pengantaran. Batas maksimal pemesanan pada pukul 05.00 untuk sarapan, 09.00 untuk makan siang, dan 15.00 untuk makan malam",
    },
    {
      question: "Apa saja metode pembayaran yang tersedia?",
      answer:
        "Pembayaran saat ini dapat dilakukan melalui pembayaran online seperti QRIS, E-Wallet, kartu debit atau kredit, dan lain-lain",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Pertanyaan Seputar Catering Harian
        </motion.h2>

        <motion.p
          className="text-gray-200 mt-3 mb-10 text-sm md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Jawaban untuk pertanyaan umum mengenai layanan catering harian kami.
        </motion.p>

        <div className="space-y-4 text-left flex flex-col items-center">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm bg-meat-100 w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              layout
            >
              <button
                onClick={() => handleToggle(index)}
                className="flex justify-between items-center w-full p-4 md:p-5 text-left text-gray-800 font-semibold hover:bg-orange-50 rounded-xl transition text-sm md:text-base"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 md:px-5 pb-4 text-gray-600 overflow-hidden font-content text-sm md:text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
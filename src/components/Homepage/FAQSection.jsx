import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Berapa minimal langganan catering harian?",
      answer:
        "Minimal langganan adalah 5 hari pemesanan. Kamu bisa memilih paket mingguan atau bulanan sesuai kebutuhan.",
    },
    {
      question: "Apakah menu bisa diganti setiap hari?",
      answer:
        "Ya, menu kami berganti setiap hari agar tidak membosankan. Kamu juga bisa request tanpa pedas atau tanpa bahan tertentu.",
    },
    {
      question: "Jam berapa makanan dikirim?",
      answer:
        "Pengiriman dilakukan setiap pagi antara pukul 06.00–09.00 untuk paket sarapan dan 10.00–13.00 untuk paket makan siang.",
    },
    {
      question: "Apakah tersedia paket diet atau healthy meal?",
      answer:
        "Kami menyediakan paket diet, low calorie, dan high protein yang dirancang untuk kebutuhan hidup sehat sehari-hari.",
    },
    {
      question: "Bagaimana cara berhenti langganan?",
      answer:
        "Kamu bisa menghubungi admin maksimal H-1 sebelum pengiriman untuk menghentikan atau menjeda langganan.",
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
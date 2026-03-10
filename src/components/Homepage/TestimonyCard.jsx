import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonyCard({ data }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-80 h-auto p-5 flex flex-col justify-between bg-linear-to-br from-meat-200 to-meat-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 font-display"
    >
      {/* Quote icon di background */}
      <Quote
        className="absolute top-3 right-3 opacity-20 w-14 rotate-12 select-none pointer-events-none"
      width={40}/>

      {/* Header: avatar + nama */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-meat-500 flex justify-center items-center text-white text-xl font-bold shadow-inner">
          {data.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">{data.name}</h3>
          <p className="text-sm text-amber-700 italic">Customer</p>
        </div>
      </div>

      {/* Isi pesan */}
      <p className="text-gray-800 text-justify mb-3 leading-relaxed">
        “{data.message}”
      </p>

      {/* Rating */}
      <div className="flex justify-end">
        <p className="text-yellow-500 text-lg tracking-wider">
          {"⭐".repeat(data.rating)}
        </p>
      </div>
    </motion.div>
  );
}

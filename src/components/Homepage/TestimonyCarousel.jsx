import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonyCard from "./TestimonyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonyCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optional: auto slide setiap 5 detik
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Tentukan posisi untuk 3 card (kiri, tengah, kanan)
  const getPosition = (i) => {
    const diff = (i - index + testimonials.length) % testimonials.length;

    const offset = isMobile ? 160 : 250;

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 10 };

    if (diff === 1) return { x: offset, scale: 0.8, opacity: 0.6, zIndex: 5 };

    if (diff === testimonials.length - 1)
      return { x: -offset, scale: 0.8, opacity: 0.6, zIndex: 5 };

    return { x: 0, scale: 0.5, opacity: 0 };
  };

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      {/* ===== ARROW LEFT ===== */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-20 z-20 p-3 md:p-4 bg-meat-400 rounded-full shadow-md hover:bg-meat-500 transition bottom-50 md:bottom-65"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* ===== CAROUSEL AREA ===== */}
      <div className="relative w-full max-w-3xl h-65 md:h-80 flex items-center justify-center">
        {testimonials.map((testimony, i) => {
          const pos = getPosition(i);

          return (
            <motion.div
              key={i}
              className="absolute"
              animate={pos}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <TestimonyCard data={testimony} />
            </motion.div>
          );
        })}
      </div>

      {/* ===== ARROW RIGHT ===== */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-20 z-20 p-3 md:p-4 bg-meat-400 rounded-full shadow-md hover:bg-meat-500 transition bottom-50 md:bottom-65"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* ===== DOT INDICATOR ===== */}
      <div className="flex gap-3 mt-8">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === index ? "bg-veg-400 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

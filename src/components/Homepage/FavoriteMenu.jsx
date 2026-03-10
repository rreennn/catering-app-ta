import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nasiGoreng from "../../assets/nasiGoreng.png";
import salad from "../../assets/salad.png";
import soto from "../../assets/soto.png";

const menus = [
  { name: "Nasi Goreng", desc: "Nasi goreng dengan varian berbeda tiap hari", price: "Rp 20.000", img: nasiGoreng },
  { name: "Salad Sayur", desc: "Menu sampingan sayuran yang cocok dengan menu kami", price: "Rp 15.000", img: salad },
  { name: "Soto Ayam", desc: "Soto dengan varian berbeda tiap minggu", price: "Rp 20.000", img: soto },
];

export default function FavoriteMenu() {
  const [active, setActive] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % menus.length);
    }, 4000); // ganti setiap 4 detik

    return () => clearInterval(interval); // cleanup saat unmount
  }, []);

  return (
    <div className="flex flex-col gap-10 md:gap-20 items-center overflow-hidden w-full min-h-screen pt-10 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-1 font-logo mt-8 text-center">
        Menu Favorit
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-evenly relative w-full font-display gap-10 md:gap-0">
        <div className="relative w-full md:w-1/2 flex justify-center order-1 md:order-2 min-h-75 md:min-h-125">
          <motion.div
            className="absolute w-70 h-70 md:w-100 md:h-100 bg-meat-300 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {menus.map((menu, i) => {
            const offset = i - active;

            const positions = [
              { y: 0, scale: 0.8, opacity: 0 },
              { y: 75, scale: 1.8, opacity: 1 },
              { y: 150, scale: 0.8, opacity: 0 },
            ];

            const desktopPositions = [
              { y: -100, scale: 0.8, opacity: 0 },
              { y: 75, scale: 1.5, opacity: 1 },
              { y: 180, scale: 0.8, opacity: 0 },
            ];

            const posMobile =
              offset === 0
                ? positions[1]
                : offset === -1 || (offset === menus.length - 1 && active === 0)
                  ? positions[0]
                  : positions[2];

            const posDesktop =
              offset === 0
                ? desktopPositions[1]
                : offset === -1 || (offset === menus.length - 1 && active === 0)
                  ? desktopPositions[0]
                  : desktopPositions[2];

            return (
              <motion.img
                key={menu.name}
                src={menu.img}
                alt={menu.name}
                className="absolute cursor-pointer select-none w-50 md:w-100 object-contain"
                animate={{
                  y: window.innerWidth < 768 ? posMobile.y : posDesktop.y,
                  scale: window.innerWidth < 768 ? posMobile.scale : posDesktop.scale,
                  opacity: window.innerWidth < 768 ? posMobile.opacity : posDesktop.opacity,
                  zIndex: offset === 0 ? 10 : 5,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                onClick={() => setActive(i)}
              />
            );
          })}

          <div className="absolute right-2 md:right-4 flex flex-col gap-4 md:gap-6">
            {menus.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all duration-300 ${
                  i === active ? "bg-black scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center bg-white p-2 md:p-5 rounded-lg shadow-md w-full md:w-1/4 text-center md:text-left order-2 md:order-1"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3">{menus[active].name}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base text-justify">{menus[active].desc}</p>
            <p className="font-semibold text-base md:text-lg md:text-end mb-3">
              Start from {menus[active].price}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
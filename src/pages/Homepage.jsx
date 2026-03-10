import FavoriteMenu from "../components/Homepage/FavoriteMenu";
import TestimonyCarousel from "../components/Homepage/TestimonyCarousel";
import React from "react";
import { motion } from "framer-motion";
import food from "../assets/border.png";
import OrderProcedure from "../components/Homepage/OrderProcedure";
import FAQSection from "../components/Homepage/FAQSection";
import ContactCard from "../components/Homepage/ContactCard";
import { Link } from "react-router-dom";

export default function Homepage() {
  const testimonies = [
    { name: "Rina", message: "Makanannya enak banget, pengiriman cepat dan rapi!", rating: 5 },
    { name: "Dimas", message: "Porsi pas dan sehat, cocok buat yang diet!", rating: 4 },
    { name: "Ayu", message: "Sudah langganan tiap minggu, nggak pernah kecewa.", rating: 5 },
    { name: "Sinta", message: "Anakku suka banget.", rating: 5 },
    { name: "Budi", message: "Bisa kustom menu, jadi nggak bosen tiap hari.", rating: 5 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div
        className="bg-veg-200 flex md:flex-row flex-col justify-center items-center gap-8 md:pb-20 pb-10 md:pt-50 pt-30 min-h-screen max-w-screen"
        id="home"
      >
        <img
          src="https://images.unsplash.com/photo-1704125772804-a0dc01c8cba2?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-90 w-full md:h-120 md:w-[50vw] object-cover md:rounded-2xl shadow-lg"
        />
        <div className="md:h-120 md:w-[25vw] w-[90vw] p-3 md:mb-0 rounded-2xl shadow-lg bg-veg-600 text-white justify-center flex flex-col gap-2">
          <p className="font-logo md:text-5xl text-3xl font-medium">
            Menu Baru Setiap Hari!
          </p>
          <p className="font-display md:text-lg text-md">Pilih menu yang Anda suka</p>
          <Link
            to={"/menu"}
            className="bg-meat-600 text-center shadow-xl font-display py-2 hover:bg-veg-100 duration-300 hover:text-black rounded-full md:text-lg font-bold"
          >
            Pesan Sekarang!
          </Link>
          <button className="bg-meat-700 shadow-xl font-display py-2 hover:bg-veg-200 duration-300 hover:text-black rounded-full md:text-lg font-bold">
            Daftar Sekarang!
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col items-center bg-veg-100" id="about-us">
        <div className="flex bg-veg-600 w-full h-[88vh] md:flex-row flex-col justify-center">
          <div className="w-full md:w-120 gap-2 justify-center flex flex-col p-10 text-white">
            <h2 className="font-logo text-center text-2xl font-bold">Tentang kami</h2>
            <p className="font-content text-justify">
              Kami memulai perjalanan ini dari dapur kecil di rumah, berbekal cinta terhadap masakan rumahan dan keinginan untuk berbagi kehangatan di setiap hidangan.
            </p>
          </div>
          <div className="flex shadow-xl w-full md:w-auto">
            <img
              src="https://images.unsplash.com/photo-1653233797467-1a528819fd4f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
              alt=""
              className="w-full md:w-160 md:h-auto h-65 object-cover shadow-xl"
            />
          </div>
        </div>
        <div className="w-full md:h-[8vh] h-[10vh] flex items-center justify-center bg-meat-50 font-display font-semibold! text-center">
          <p>Kami sudah dipercaya oleh lebih dari 1000 pelanggan!</p>
        </div>
      </div>

      {/* Favorite Menu */}
      <div className="min-h-screen bg-veg-200 flex items-center justify-center">
        <FavoriteMenu />
      </div>

      {/* Testimony */}
      <div className="flex min-h-screen md:h-auto pt-12 items-center flex-col gap-2 bg-veg-600 relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-logo text-white"
        >
          Apa Kata Mereka?
        </motion.h2>

        <TestimonyCarousel testimonials={testimonies} />

        <div className="relative w-full h-50 md:h-80 grow">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={food}
            alt=""
            className="absolute bottom-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Order Procedure */}
      <div className="min-h-screen flex justify-center items-center flex-col gap-1 bg-veg-200 font-display">
        <OrderProcedure />
      </div>

      {/* FAQ Section */}
      <div className="min-h-screen flex justify-center items-center flex-col gap-1 bg-veg-700 font-display">
        <FAQSection />
      </div>

      {/* Contact Section */}
      <div className="min-h-screen flex justify-center items-center flex-col gap-1 bg-veg-200 font-display pb-5" id="kontak">
        <ContactCard />
      </div>
    </div>
  );
}
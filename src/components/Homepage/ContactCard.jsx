import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import Button from "../Button";

export default function ContactCard() {
  // Animasi simpel
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="py-1">
      <div className="mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-center mb-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 md:mb-2 my-5">
            Hubungi Kami
          </h2>
          <p className="text-slate-500">
            Punya pertanyaan atau mau pesan untuk acara besar? Yuk ngobrol!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* === KIRI: INFO KARTU === */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-meat-100 rounded-3xl p-6 md:p-7 shadow-sm border border-meat-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Nikita Catering</h3>
              
              <div className="space-y-3 w">
                {/* Alamat */}
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Lokasi Dapur</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Jl. Pemuda No. 123, Sekayu,<br />
                      Semarang Tengah, Jawa Tengah 50132
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-orange-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Jam Operasional</h4>
                    <p className="text-slate-600 text-sm">Senin - Sabtu: 08.00 - 17.00</p>
                    <p className="text-sm text-red-500 font-medium">Minggu: Libur (Khusus Event)</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-orange-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email</h4>
                    <a href="mailto:hello@nikitacatering.com" className="text-slate-600 text-sm hover:text-orange-600 transition">
                      hello@nikitacatering.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Bawah: Tombol WA & Sosmed */}
            <div className="mt-5 pt-5 border-t border-orange-200/50">
              <p className="text-sm text-slate-500 mb-4 font-medium">Fast Response via WhatsApp:</p>
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-12 rounded-xl shadow-lg shadow-green-200 mb-6 flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Chat WhatsApp Sekarang
              </Button>

              <div className="flex justify-center gap-4">
                <a href="#" className="p-2 bg-white rounded-full text-slate-600 hover:text-pink-600 hover:shadow transition duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 bg-white rounded-full text-slate-600 hover:text-blue-600 hover:shadow transition duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* === KANAN: MAPS EMBED === */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full min-h-100 rounded-3xl overflow-hidden shadow-lg border-4 border-white relative"
          >
            {/* Google Maps Iframe */}
            <iframe 
              title="Lokasi Nikita Catering"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.226077698506!2d110.41507307499696!3d-6.982626393018247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4f17973703%3A0x6dca3065eb00109c!2sSimpang%20Lima%20Semarang!5e0!3m2!1sid!2sid!4v1703264426555!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: "100%" }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500" // Efek hitam putih jadi warna pas dihover
            ></iframe>

            {/* Overlay Text (Optional) */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-xs font-bold text-slate-800">
              📍 Area Pengiriman: Semarang Kota
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
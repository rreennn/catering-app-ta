import React, { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const menus = ["Home", "About Us", "Kontak", "Menu", "Riwayat"];
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useAuth();
  const visibleMenus = auth ? menus : menus.filter((m)=> m!== "Riwayat")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/menu") {
      setActive("Menu");
    } else if (path === "/") {
      if (active === "Menu" || active === "Order") {
        setActive("Home");
      }
    }
  }, [location.pathname]);

  const handleNavigation = (menuName) => {
    setActive(menuName);

    if (menuName === "Menu") {
      navigate("/menu");
      return;
    }
    
    if (menuName === "Riwayat") {
      navigate("/history");
      return;
    }

    const sectionId = menuName.toLowerCase().replace(/\s+/g, "-");

    // Fungsi helper untuk melakukan scroll
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 30;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname === "/") {
      scrollToSection();
    } else {
      navigate("/");
      setTimeout(() => {
        scrollToSection();
      }, 100);
    }
  };

  return (
    <header className="w-full fixed top-0 z-50">
      {/* TOP BRAND */}
      <div
        className={`flex flex-col items-center justify-center bg-meat-100 transition-all ease-in-out duration-500 overflow-hidden ${
          scrolled ? "h-0 scale-b-0" : "h-28 opacity-100 scale-y-100 pt-2"
        }`}
      >
        <h1 className="font-logo font-semibold text-3xl md:text-5xl underline underline-offset-5 text-center">
          Nikita Catering
        </h1>
        <p className="font-style font-semibold text-sm md:text-lg text-center">
          Eat Healthier Starts Today
        </p>
      </div>

      {/* NAVBAR */}
      <nav className="flex w-full h-14 bg-meat-200 justify-between items-center font-display md:rounded-b-2xl shadow-[0_2px_10px_rgba(0,0,0,0.15)] px-4 md:px-0">
        <ul className="relative hidden md:flex items-stretch w-fit h-full ml-5">
          <div
            className="absolute bottom-0 h-full bg-veg-300 shadow-[-5px_3px_5px_rgba(0,0,0,0.25)] rounded-t-xl transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / visibleMenus.length}%`,
              transform: `translateX(${visibleMenus.indexOf(active) * 100}%)`,
            }}
          ></div>

          {visibleMenus.map((menu) => (
            <li
              key={menu}
              onClick={() => handleNavigation(menu)}
              className={`relative z-10 cursor-pointer w-32 flex items-center justify-center text-center font-medium transition-colors duration-300 ${
                active === menu
                  ? "text-white"
                  : "text-amber-900 hover:text-amber-600"
              }`}
            >
              {menu}
            </li>
          ))}
        </ul>

        {/* ===== Mobile Hamburger ===== */}
        <button
          className="md:hidden text-amber-900 font-semibold"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        {/* Right Side */}
        <div className="flex gap-4 items-center md:mr-5">
          <Link to={"/cart"}>
            <ShoppingCart className="cursor-pointer text-amber-900 hover:text-amber-700" />
          </Link>

          <div className="flex items-center gap-2 text-amber-900">
            <User />
            {auth ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* ===== Mobile Dropdown Menu ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-meat-200 shadow-lg">
          {visibleMenus.map((menu) => (
            <div
              key={menu}
              onClick={() => {
                handleNavigation(menu);
                setMobileOpen(false);
              }}
              className="px-6 py-3 hover:bg-veg-200 cursor-pointer"
            >
              {menu}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

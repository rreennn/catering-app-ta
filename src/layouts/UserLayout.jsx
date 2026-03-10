import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-lightbg overflow-hidden">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

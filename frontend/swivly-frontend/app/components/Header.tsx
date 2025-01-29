"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Import icons

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="Swivly Logo" width={150} height={50} className="h-auto w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/marketplace" className="hover:underline">Market Place</Link>
        <Link href="/accommodation" className="hover:underline">Accommodation</Link>
        <Link href="/contact" className="hover:underline">Contact Us</Link>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-white text-blue-500 py-2 px-6 rounded-full">Log In</button>
        <button className="bg-lime-400 text-black py-2 px-6 rounded-full">Sign Up</button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-black text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <button className="absolute top-4 right-4 text-white" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>

        <nav className="flex flex-col space-y-6 mt-16 px-6">
          <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/marketplace" className="hover:underline" onClick={() => setIsOpen(false)}>Market Place</Link>
          <Link href="/accommodation" className="hover:underline" onClick={() => setIsOpen(false)}>Accommodation</Link>
          <Link href="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </nav>

        <div className="mt-6 px-6">
          <button className="bg-white text-blue-500 py-2 px-6 rounded-full w-full" onClick={() => setIsOpen(false)}>Log In</button>
          <button className="bg-lime-400 text-black py-2 px-6 rounded-full w-full mt-4" onClick={() => setIsOpen(false)}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

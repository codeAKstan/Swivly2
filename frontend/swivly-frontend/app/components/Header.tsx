"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Store, Building2, Mail } from "lucide-react"; // Import icons

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center relative z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="Swivly Logo" width={150} height={50} className="h-auto w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:underline flex items-center space-x-2">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link href="/marketplace" className="hover:underline flex items-center space-x-2">
          <Store size={20} />
          <span>Market Place</span>
        </Link>
        <Link href="/accommodation" className="hover:underline flex items-center space-x-2">
          <Building2 size={20} />
          <span>Accommodation</span>
        </Link>
        <Link href="/contact" className="hover:underline flex items-center space-x-2">
          <Mail size={20} />
          <span>Contact Us</span>
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-white text-blue-500 py-2 px-6 rounded-full">Log In</button>
        <button className="bg-lime-400 text-black py-2 px-6 rounded-full">Sign Up</button>
      </div>

      {/* Mobile Menu Button */}
      {!isOpen && (
        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      )}

      {/* Mobile Sidebar Navigation */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-lg">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-white" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>

          {/* Sidebar Nav */}
          <nav className="flex flex-col space-y-6 mt-16 px-6">
            <Link href="/" className="hover:underline flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="/marketplace" className="hover:underline flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Store size={20} />
              <span>Market Place</span>
            </Link>
            <Link href="/accommodation" className="hover:underline flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Building2 size={20} />
              <span>Accommodation</span>
            </Link>
            <Link href="/contact" className="hover:underline flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Mail size={20} />
              <span>Contact Us</span>
            </Link>
          </nav>

          {/* Sidebar Auth Buttons */}
          <div className="mt-6 px-6">
            <button className="bg-white text-blue-500 py-2 px-6 rounded-full w-full" onClick={() => setIsOpen(false)}>Log In</button>
            <button className="bg-lime-400 text-black py-2 px-6 rounded-full w-full mt-4" onClick={() => setIsOpen(false)}>Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

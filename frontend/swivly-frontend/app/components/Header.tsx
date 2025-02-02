// components/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Menu, X, Home, Store, Building2, Mail, LogIn, UserPlus, ShoppingCart, LayoutDashboard 
} from "lucide-react"; // Import icons
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // This will trigger re-render when isAuthenticated changes

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center relative z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="Swivly Logo" width={150} height={50} className="h-auto w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="flex items-center space-x-2 hover:underline">
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link href="/marketplace" className="flex items-center space-x-2 hover:underline">
          <Store size={18} />
          <span>Market Place</span>
        </Link>
        <Link href="/accommodation" className="flex items-center space-x-2 hover:underline">
          <Building2 size={18} />
          <span>Accommodation</span>
        </Link>
        <Link href="/contact" className="flex items-center space-x-2 hover:underline">
          <Mail size={18} />
          <span>Contact Us</span>
        </Link>
      </nav>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex space-x-4">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="flex items-center space-x-2 bg-white text-blue-500 py-2 px-6 rounded-full">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="/cart" className="flex items-center space-x-2 bg-lime-400 text-black py-2 px-6 rounded-full">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
            {/* <button onClick={logout} className="flex items-center space-x-2 bg-red-500 text-white py-2 px-6 rounded-full">
              <span>Logout</span>
            </button> */}
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center space-x-2 bg-white text-blue-500 py-2 px-6 rounded-full">
              <LogIn size={18} />
              <span>Log In</span>
            </Link>
            <Link href="/register" className="flex items-center space-x-2 bg-lime-400 text-black py-2 px-6 rounded-full">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button (Only Show Menu Icon) */}
      {!isOpen && (
        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      )}

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* Close Button (Only Inside Sidebar) */}
        <button className="absolute top-4 right-4 text-white" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>

        <nav className="flex flex-col space-y-6 mt-16 px-6">
          <Link href="/" className="flex items-center space-x-2 hover:underline" onClick={() => setIsOpen(false)}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link href="/marketplace" className="flex items-center space-x-2 hover:underline" onClick={() => setIsOpen(false)}>
            <Store size={18} />
            <span>Market Place</span>
          </Link>
          <Link href="/accommodation" className="flex items-center space-x-2 hover:underline" onClick={() => setIsOpen(false)}>
            <Building2 size={18} />
            <span>Accommodation</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 hover:underline" onClick={() => setIsOpen(false)}>
            <Mail size={18} />
            <span>Contact Us</span>
          </Link>
        </nav>

        <div className="mt-6 px-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="flex items-center justify-center space-x-2 bg-white text-blue-500 py-2 px-6 rounded-full w-full" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link href="/cart" className="flex items-center justify-center space-x-2 bg-lime-400 text-black py-2 px-6 rounded-full w-full mt-4" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={18} />
                <span>Cart</span>
              </Link>
              <button onClick={logout} className="flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-6 rounded-full w-full mt-4">
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center justify-center space-x-2 bg-white text-blue-500 py-2 px-6 rounded-full w-full" onClick={() => setIsOpen(false)}>
                <LogIn size={18} />
                <span>Log In</span>
              </Link>
              <Link href="/register" className="flex items-center justify-center space-x-2 bg-lime-400 text-black py-2 px-6 rounded-full w-full mt-4" onClick={() => setIsOpen(false)}>
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
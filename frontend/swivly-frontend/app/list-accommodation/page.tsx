"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ListAccommodationPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">List Accommodation</h1>
          {/* Add your accommodation form here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
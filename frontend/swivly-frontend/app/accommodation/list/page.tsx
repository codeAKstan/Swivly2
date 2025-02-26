"use client";

import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ListAccommodation() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    lodge_name: "",
    description: "",
    price: "",
    number_of_rooms: "",
    location: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    // Redirect to the accommodation list page after successful submission
  };

  if (!isAuthenticated || user?.role !== "agent") {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Swivly - List Accommodation</title>
        <meta name="description" content="List your accommodation on Swivly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">List Your Accommodation</h1>
            <form onSubmit={handleSubmit}>
              {/* Form fields for listing accommodation */}
              <div className="mb-4">
                <label className="block text-gray-700">Lodge Name</label>
                <input
                  type="text"
                  value={formData.lodge_name}
                  onChange={(e) => setFormData({ ...formData, lodge_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Rooms</label>
                <input
                  type="number"
                  value={formData.number_of_rooms}
                  onChange={(e) => setFormData({ ...formData, number_of_rooms: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-lime-400 text-black font-semibold py-3 px-6 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
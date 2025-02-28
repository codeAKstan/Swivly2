"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// Function to get the CSRF token from cookies
function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function ListAccommodation() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    lodge_name: "",
    description: "",
    price: "",
    number_of_rooms: "",
    location: "",
    image: null,
  });

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:8000/accommodation/api/locations/");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the CSRF token
    const csrfToken = getCookie("csrftoken");

    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("lodge_name", formData.lodge_name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("number_of_rooms", formData.number_of_rooms);
    formDataToSend.append("location", formData.location);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:8000/accommodation/api/accommodations/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken || "", // Include the CSRF token in the headers
        },
        body: formDataToSend, // Use FormData for file uploads
        credentials: "include", // Include credentials (cookies)
      });

      if (!response.ok) {
        throw new Error("Failed to submit accommodation");
      }

      // Redirect to the accommodation list page after successful submission
      router.push("/accommodation");
    } catch (error) {
      console.error("Error submitting accommodation:", error);
    }
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
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
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
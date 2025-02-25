"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";
import { Bed, Bath, Users, Star, MapPin, User, Phone } from "lucide-react";

export default function HouseDetail() {
  const params = useParams();
  const { id } = params; // Get the house ID from the URL
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch house details from the backend
      const fetchHouseDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8000/accommodation/api/accommodations/${id}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch house details");
          }
          const data = await response.json();
          setHouse(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchHouseDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!house) {
    return <p>No house found.</p>;
  }

  return (
    <>
      <Head>
        <title>Swivly - {house.lodge_name}</title>
        <meta name="description" content={`Details for ${house.lodge_name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {/* House Image */}
            <img
              src={`http://localhost:8000/media/${house.image}`}
              alt={house.lodge_name}
              className="w-full h-96 object-contain rounded-md"
            />

            {/* House Details */}
            <h1 className="text-3xl font-bold mt-6">{house.lodge_name}</h1>
            <p className="text-gray-600 mt-2">{house.description}</p>

            {/* Location */}
            <div className="flex items-center mt-4">
              <MapPin size={20} className="mr-2" />
              <span>{house.location__name}</span>
            </div>

            {/* Listed By */}
            <div className="flex items-center mt-4">
              <User size={20} className="mr-2" />
              <span>Listed by: {house.user__username}</span>
            </div>

            {/* Rooms and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-center">
                <Bed size={20} className="mr-2" />
                <span>{house.number_of_rooms} Bedrooms</span>
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold mt-6">₦{house.price} / year</p>

            {/* Contact Button */}
            <button
              className="bg-lime-400 text-black font-semibold py-3 px-6 rounded-lg mt-6"
              onClick={() => setShowPhoneNumber(!showPhoneNumber)}
            >
              Contact Agent
            </button>

            {/* Display Phone Number */}
            {showPhoneNumber && (
              <div className="flex items-center mt-4">
                <Phone size={20} className="mr-2" />
                <span>Phone: {house.user__phone_number}</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
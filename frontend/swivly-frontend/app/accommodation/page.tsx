"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { Search, MapPin, Bed, Bath, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch accommodations from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/accommodation/api/accommodations/");
        if (!response.ok) {
          throw new Error("Failed to fetch accommodations");
        }
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter accommodations based on search query, location, and price
  const filteredAccommodations = accommodations.filter((accommodation) => {
    const matchesSearch = accommodation.lodge_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accommodation.location__name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? accommodation.location__name.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesPrice =
      (!minPrice || accommodation.price >= parseFloat(minPrice)) &&
      (!maxPrice || accommodation.price <= parseFloat(maxPrice));
    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <>
      <Head>
        <title>Swivly - Accommodation</title>
        <meta name="description" content="Find the best accommodations for students near your campus." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <section className="relative text-center py-40 bg-cover bg-[center_10%] bg-[url('/images/bgg.webp')]">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold">Find Your Perfect Accommodation</h1>
            <p className="mt-4 text-lg">Search for the best accommodations near your campus and book with ease.</p>
          </div>
        </section>

        {/* Feature Section */}
        <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <img src="/images/SearchDesktop.svg" alt="Search" className="mx-auto" />
            <h3 className="font-bold text-xl mt-4">Search simply</h3>
            <p className="text-gray-600">Search through different accommodations in just a few seconds.</p>
          </div>
          <div>
            <img src="/images/CompareDesktop.svg" alt="Compare" className="mx-auto" />
            <h3 className="font-bold text-xl mt-4">Compare confidently</h3>
            <p className="text-gray-600">Compare prices from 100s of sites at once.</p>
          </div>
          <div>
            <img src="/images/SaveDesktop.svg" alt="Save" className="mx-auto" />
            <h3 className="font-bold text-xl mt-4">Save big</h3>
            <p className="text-gray-600">Discover a great deal.</p>
          </div>
        </section>

        <section className="bg-[#6850F5] text-white py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 bg-[#4D37C3] p-6 rounded-lg text-left">
              <h2 className="text-lg font-bold text-black bg-lime-400 p-2 rounded-md">FILTER BY</h2>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Location</h3>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full p-2 rounded-md text-black"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Price Range</h3>
                <input
                  type="number"
                  placeholder="Min price"
                  className="w-full p-2 rounded-md text-black"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max price"
                  className="w-full p-2 rounded-md text-black mt-2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md flex-1">
              {/* Search Bar */}
              <div className="flex justify-end mb-6 w-full md:w-1/2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search accommodations"
                  className="w-full p-2 pl-10 rounded-full text-black border border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Accommodation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAccommodations.length > 0 ? (
                  filteredAccommodations.map((accommodation, index) => (
                    <Link href={`/accommodation/${accommodation.id}`} key={accommodation.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white text-black px-6 py-6 rounded-lg shadow-md relative cursor-pointer"
                      >
                        <motion.img
                          src={accommodation.image}
                          alt={accommodation.lodge_name}
                          className="w-full h-40 object-cover rounded-md"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <h3 className="mt-2 font-semibold">{accommodation.lodge_name}</h3>
                        <p className="text-gray-600">{accommodation.location__name}</p>
                        <div className="flex items-center mt-2">
                          <Bed size={16} className="mr-2" />
                          <span>{accommodation.number_of_rooms} Bedrooms</span>
                        </div>
                        <p className="mt-2 font-bold">₦{accommodation.price} / year</p>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-600">No accommodations found.</div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "./components/Header";
import { Typewriter } from "react-simple-typewriter";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/Faqs";
import Footer from "./components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products and categories from the backend
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("http://localhost:8000/product/api/products/");
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesResponse = await fetch("http://localhost:8000/product/api/categories/");
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
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

  return (
    <>
      <Head>
        <title>Swivly - Campus Marketplace</title>
        <meta name="description" content="Search accommodations, buy, sell your new or used properties and connect with ease the student way." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <section className="relative text-center py-40 bg-cover bg-[center_10%] bg-[url('/images/bgg.webp')]">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold">
              <Typewriter
                words={["Campus Marketplace For Accommodations And More"]}
                loop={1}
                cursor
                cursorStyle="✍"
                typeSpeed={80}
                deleteSpeed={30}
              />
            </h1>
            <p className="mt-4 text-lg">
              Search accommodations, buy, sell your new or used properties and connect with ease the student way.
            </p>

            <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
              <button className="bg-lime-500 text-black font-semibold py-3 px-6 rounded-lg w-3/4 sm:w-auto">
                List Your Property
              </button>
              <button className="bg-white text-blue-400 font-semibold py-3 px-6 rounded-lg w-3/4 sm:w-auto">
                Explore Now
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#6850F5] text-white py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 bg-[#4D37C3] p-6 rounded-lg text-left">
              <h2 className="text-lg font-bold text-black bg-lime-400 p-2 rounded-md">SHOP BY</h2>

              {/* Categories */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Categories</h3>
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="category" defaultChecked className="accent-lime-400" />
                    <span>All</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input type="radio" name="category" className="accent-lime-400" />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg">By Location</h3>
                <select className="mt-2 w-full bg-white text-black p-2 rounded-md">
                  <option>Select a university in Nigeria</option>
                </select>
                <input type="text" placeholder="Region in the University" className="mt-2 w-full bg-white text-black p-2 rounded-md" />
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md flex-1">
              {/* Search Bar */}
              <div className="flex justify-end mb-6 w-full md:w-1/2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search items and accommodation"
                  className="w-full p-2 pl-10 rounded-full text-black border border-gray-300"
                />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-black px-6 py-6 rounded-lg shadow-md relative"
                  >
                    {product.images.length > 0 && (
                      <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-40 object-contain rounded-md"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <h3 className="mt-2 font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₦{product.price}</p>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#65A30D" }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="absolute top-2 right-2 bg-lime-400 text-black px-5 py-2 text-sm rounded-full flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      SHOP NOW
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* See More Button */}
              <div className="flex justify-end mt-6">
                <button className="text-lime-400 text-lg font-bold flex items-center">
                  See more <span className="ml-2">➡</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials section */}
        <Testimonials />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    perPage: 6,
    hasNext: false,
    hasPrevious: false,
  });

  // Fetch products and categories from the backend
  const fetchProducts = async (page = 1, perPage = 6) => {
    try {
      const response = await fetch(
        `http://localhost:8000/product/api/products/?page=${page}&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("API Response:", data); // Log the API response for debugging

      // Set products and pagination
      setProducts(data.products);

      // Update pagination state
      setPagination({
        currentPage: data.pagination.current_page,
        totalPages: data.pagination.total_pages,
        totalProducts: data.pagination.total_products,
        perPage: data.pagination.per_page,
        hasNext: data.pagination.has_next,
        hasPrevious: data.pagination.has_previous,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/product/api/categories/");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle page change for pagination
  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  // Filter products based on selected category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Head>
        <title>Swivly - Marketplace</title>
        <meta name="description" content="Explore the campus marketplace for buying and selling products and accommodations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        {/* Banner Section */}
        <section className="relative h-96 w-full">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <img
            src="/images/marketplace-banner.jpg"
            alt="Marketplace Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Marketplace</h1>
            <p className="text-lg">Find the best deals on campus accommodations, products, and more.</p>
            <Link
              href="/marketplace"
              className="mt-6 bg-lime-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-lime-500 transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </section>

        {/* Marketplace Content */}
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
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="accent-lime-400"
                    />
                    <span>All</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                        className="accent-lime-400"
                      />
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white text-black px-6 py-6 rounded-lg shadow-md relative cursor-pointer"
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
                        <Link href={`/product/${product.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#65A30D" }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="absolute top-2 right-2 bg-lime-400 text-black px-5 py-2 text-sm rounded-full flex items-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            SHOP NOW
                          </motion.button>
                        </Link>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-600">
                    No products found.
                  </div>
                )}
              </div>

              {/* Pagination Controls (Replacing "See More") */}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevious}
                  className="bg-lime-400 text-black px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-black">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="bg-lime-400 text-black px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
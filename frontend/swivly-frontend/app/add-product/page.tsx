"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const AddProductPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Get user and loading state from AuthContext
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Route guard: Redirect if user is not logged in or not a seller
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "seller")) {
      router.push("/login"); // Redirect to login page
    }
  }, [user, authLoading, router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("user", user.id);
    images.forEach((image) => formData.append("images", image));
  
    try {
      const token = localStorage.getItem("token");
  
      // Fetch the CSRF token from Django
      const csrfResponse = await fetch("http://localhost:8000/csrf/", {
        credentials: "include", // Include cookies
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;
  
      const response = await fetch("http://localhost:8000/product/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRFToken": csrfToken, // Include CSRF token in headers
        },
        credentials: "include", // Include cookies
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      const data = await response.json();
      console.log("Product added successfully:", data);
      router.push("/view-products");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return <p>Loading...</p>;
  }

  // Show nothing if user is not logged in or not a seller (redirect will happen in useEffect)
  if (!user || user.role !== "seller") {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
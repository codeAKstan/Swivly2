"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  user: string;
  images: string[];
}

export default function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/api/products/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-full h-64 object-contain rounded-md"
              />
            ))}
          </div>

          {/* Product Details */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">₦{product.price}</p>
            <p className="text-gray-600 mt-2">Category: {product.category}</p>
            <p className="text-gray-600 mt-2">Posted by: {product.user}</p>
            <p className="text-gray-600 mt-4">Description: {product.description}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
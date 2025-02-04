"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Home, Phone, CreditCard, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isEditing, setIsEditing] = useState(false);

  // Debugging: Log the authentication state
  console.log("CheckoutPage - isAuthenticated:", isAuthenticated);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login...");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // If user is not authenticated, do not render the rest of the component
  if (!isAuthenticated) {
    console.log("User is not authenticated, rendering nothing.");
    return null;
  }

  // Calculate the total price
  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
  }, 0);

  // Handle address and phone number update
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/user/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address, phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      setIsEditing(false);
      alert("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
      alert("Failed to update details. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {/* Buyer Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Buyer Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home size={16} />
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-gray-300 p-1 rounded-md"
                    />
                  ) : (
                    address || "Not provided"
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p>
                  <span className="font-medium">Phone Number:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 p-1 rounded-md"
                    />
                  ) : (
                    phoneNumber || "Not provided"
                  )}
                </p>
              </div>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition-colors"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₦{item.price}</p>
                </div>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xl font-semibold">
                Total: ₦{totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <Link
              href="/cart"
              className="bg-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-400 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Edit Cart
            </Link>
            <button
              onClick={() => alert("Order placed successfully!")}
              className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors flex items-center gap-2"
            >
              <CreditCard size={16} />
              Place Order
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
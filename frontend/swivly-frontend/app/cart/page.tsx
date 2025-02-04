"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function CartPage() {
    const { items, removeItem } = useCartStore();

    // Calculate the total price of all items in the cart
    const totalPrice = items.reduce((total, item) => {
        return total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters (e.g., ₦) and convert to number
    }, 0);

    // Format the total price with commas (optional)
    const formattedTotalPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(totalPrice);

    return (
        <>
            <Header />
            <main className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                    {items.length > 0 ? (
                        <>
                            {/* Cart Items */}
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">₦{item.price}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            {/* Total Price */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xl font-semibold">
                                    Total: {formattedTotalPrice}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex justify-between">
                                <Link
                                    href="/"
                                    className="bg-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-400 transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft size={16} />
                                    Continue Shopping
                                </Link>
                                <button
                                    onClick={() => {
                                        // Check if the user is logged in
                                        const token = localStorage.getItem("token");
                                        if (!token) {
                                            // Redirect to login page if not logged in
                                            window.location.href = "/login";
                                        } else {
                                            // Redirect to checkout page if logged in
                                            window.location.href = "/checkout";
                                        }
                                    }}
                                    className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors flex items-center gap-2"
                                >
                                    <CreditCard size={16} />
                                    Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-600">Your cart is empty.</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
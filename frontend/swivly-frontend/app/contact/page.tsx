"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

import Header from "../components/Header";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-[#6850F5] text-white text-center py-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </div>

      {/* Main Contact Section */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 bg-white shadow-md rounded-lg mt-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">SEND US AN EMAIL</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type message here..."
              rows={4}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3  bg-lime-400 text-black rounded-md shadow-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="border-l pl-8">
          <h2 className="text-2xl font-semibold mb-4">GET IN TOUCH</h2>
          <div className="flex items-center space-x-3 mb-4">
            <FaPhoneAlt className="text-gray-600" />
            <p className="text-gray-700 font-medium">
              <strong>Phone:</strong> +2349137432913
            </p>
          </div>
          {/* <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-gray-600" />
            <p className="text-gray-700 font-medium">
              <strong>Address:</strong> Online store, Mainland, Lagos, Nigeria. 100001
            </p>
          </div>
          <button className="mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 transition">
            View on Google Map
          </button> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
